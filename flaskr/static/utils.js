function queries_per_filter_predicates(videoMode, inputVideo, action, classes) {
    var query;

    if (classes.length == 0){
        query = "SELECT cameraID, frameID FROM (PROCESS "
     + inputVideo + 
     " PRODUCE cameraID, frameID USING " + videoMode + " mode) WHERE action = " + action;
  
    }
    else{
        query = "SELECT cameraID, frameID FROM (PROCESS "
        + inputVideo + 
        " PRODUCE cameraID, frameID USING " + videoMode + " mode) WHERE action = " + action + " AND class = " + classes;

    }
  
    return query;
}