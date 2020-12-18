function queries_per_filter_predicates(videoMode, inputVideo, action, classes) {
    var query;

    if (classes.length == 0){
        query = "SELECT cameraID, frameID\nFROM (PROCESS "
     + inputVideo + 
     " PRODUCE cameraID, frameID USING " + videoMode + " mode)\nWHERE action = " + action;
  
    }
    else{
        query = "SELECT cameraID, frameID\nFROM (PROCESS "
        + inputVideo + 
        " PRODUCE cameraID, frameID USING " + videoMode + " mode)\nWHERE action = " + action + " AND class = " + classes;

    }
  
    return query;
}

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