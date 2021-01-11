function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
function setUpIndicator(accumulator, currentValue){
    const cur = camelize(currentValue)
    const i = accumulator[1];
    return [accumulator[0] + `, I${i}(${cur}Detections) AS ${cur}Indicator`, accumulator[1] + 1]
}

function setUpDetections(acc,cur){
    return acc + `, ${camelize(cur)}Detections`;
}
function setUpWhere(acc,cur){
    return acc + `, ${camelize(cur)}Indicator == 1`
}

function queries_per_filter_predicates(videoMode, inputVideo, action, classes) {
    action = camelize(action)
    var query;
    if(classes.length == 0){
        query = `SELECT MERGE(clipID) AS Sequence, I1(${action}Detections) AS ${action}Indicator\nFROM (PROCESS ${inputVideo}` +
       ` PRODUCE clipID, ${action}Detections USING ActionClassifier) \nWhere ${action}Indicator == 1`
    }
    else{
        query = `SELECT MERGE(clipID) AS Sequence, I1(${action}Detections) AS ${action}Indicator${classes.reduce(setUpIndicator,["",2])[0]}\nFROM (PROCESS ${inputVideo}` +
        ` PRODUCE clipID${classes.reduce(setUpDetections,"")} USING ObjectDetector, ${action}Detections USING ActionClassifier) \nWhere ${action}Indicator == 1${classes.reduce(setUpWhere,"")}`
    }
  
    return query;
}


// SELECT  MERGE(clipID) AS Sequence , I1(humanDetections) AShumanIndicator , I2(carDetections) AS  carIndicator , I3(jumpingDetections) AS  jumpingIndicator ,
// FROM (PROCESS  inputVideo  PRODUCE  clipID , humanDetections ,carDetections  USING  ObjectDetector , jumpingDetections  USINGActionClassifier)WHERE  humanIndicator =1 AND  carIndicator =1 AND  jumpingIndicator =1

function offline_sql(inputVideo, action, classes,k) {
    var query;
    if(action == "smoking"){
        query = "SELECT MERGE(clipID) AS Sequence, RANK(clipID, smokingDetections, cupDetections, glassDetections) AS sequenceScore"
        query = query + "\nFROM (PROCESS "+ inputVideo + " PRODUCE clipID, cupDetections, glassDetections USING ObjectTracker, smokingDetections USING ActionClassifier)"
        query = query + "\nWHERE I1(smokingDetections)=1 AND I2(cupDetections)=1 AND I3(glassDetections)=1 \nORDER BY sequenceScore \nLIMIT "+  k

    }
    else{
        query = "SELECT MERGE(clipID) AS Sequence, RANK(clipID, climbingDetections, cliffDetections) AS sequenceScore"
        query = query + "\nFROM (PROCESS "+ inputVideo + " PRODUCE clipID, cliffDetections USING ObjectTracker, climbingDetections USING ActionClassifier)"
        query = query + "\nWHERE I1(climbingDetections)=1 AND I2(cliffDetections)=1 \nORDER BY sequenceScore \nLIMIT "+  k
    }
 
    return query;
}