/*
*    @cubohan 
*    circa 2015
*    
*    javascript-debugger-tester
*    
*    Debug/Test javascript code with one line debug() statements with infinite possible 
*    combinations of parameters and functions (object) passed in the following pattern:
*
*    "^debug([[<?param1>.+,[ ]*]*[["[-]{2}"<?number_of_parameters_for_funct1>[0-9]+]{0,1},
*    [ ]*<?funct>\b\w{1,}\b[ ]*]+]+);{0,1}$"
*    
*    i.e
*    debug ( param11, param12..., (optional arg for funct 1 indicating no. of parameters it requires,
*    default is 1)"--(NATURAL NO.)", funct11, (funct12 follows funct 11 if output of funct11 has to be 
*    passed as parameter for funct12, and so on till (n) functions; funct12..funct1n are optional, 
*    each optionally followed by argument indicating no. of parameters they expect)funct12..., param21, param22..., func21... );
*
*    eg:
*    
*    debug("~print this line~1~", "~print this line~2~", "~print this line~3~", console.log, 17, 16, 15, "--3", add, 
*    "--1", funct_divide_by_3, console.log);
*
*    OUTPUT:
*    ~print this line~1~
*    ~print this line~2~
*    ~print this line~3~
*    16
*
*    (OPTIONS) - change values below (line 36-37).
*    <bool> disable
*    <bool> verbose
*/

debug = function(){
  var disable = false;    //set to true to disable all debug statements in the code
  var verbose = true;    //set to true to output details of every execution committed by debug
  get = function(){return verbose;}
  set = function(verb){verbose = boolean(verb);}
  var execute = function(a, b){
    if(verbose){
      if(b.length){
        var param = "param : " + b[0].toString();
        for(var i=1; i<b.length; i++){
          param +=  ", " + b[i].toString();
        }
      }
      else{
        var param = "<no parameters>";
      }
      var append = "fname : ";
      if(!a.name)
        append += "<anonymous>";
      log(append + a.name, param);
    }
    return a.apply(this, b);
  }
  return function(){
    if(disable){return;}
    var last = 0;
    var lastf;
    var lastres = [];
    var lastresLength = 0;
    var argCouple = 1;
    var isArgCouple = false;
    var arrArg = [];
    for (var i=0; i<arguments.length; i++){
      if(typeof(arguments[i]) == "function"){
        if(!lastf){lastf=i;}
        if(typeof(arguments[i-1]) == "string" && arguments[i-1][0] == '-' && arguments[i-1][1] == '-' ){
              argCouple = parseInt(arguments[i-1].substr(2, (arguments[i-1].length-2)));
              isArgCouple = true;
        }
        if(i == (lastf + (isArgCouple?2:1) ) ){
          for(var j=0;  j<lastresLength; j+=argCouple){
             if(argCouple)
              for(var k=0; k<argCouple; k++){
                arrArg[k] = lastres[j+k];
              }
            else{
              arrArg = []
              argCouple = Infinity;
            }
            lastres[j] = execute(arguments[i], arrArg);
            lastresLength = j+1;
          }
        }
        else{
          lastres = [];
          for(var j=last; j<i-(isArgCouple?1:0); j+=argCouple){
            if(argCouple)
              for(var k=0; k<argCouple; k++){
                arrArg[k] = arguments[j+k];
              }
            else{
              arrArg = []
              argCouple = Infinity;
            }
            lastres[j-last] = execute(arguments[i], arrArg);
            lastresLength = j-last+1;
          }
      }
        last = i+1;
        lastf = i;
        argCouple = 1;
        arrArg = [];
        isArgCouple = false;
      }
    }
    return lastres;
  };
}();
log = function(){ 
    var exec = 0;
return function(){ 
  exec++;  
  for(var i=0; i<arguments.length; i++){
    if(arguments[i])
    console.log(exec + " : " + arguments[i]);
  }
}
}();

//uncomment the following section to test debug functionality with random functions
/*
mul = function(a){return a*1000;}
div = function(b){return b/9;}
add = function(){var sum = 0; for(var i=0; i<arguments.length; i++){sum+=arguments[i]};  return sum;}//var strum = "";for (f in arguments) {strum+= arguments[f].toString() + ",";};log("LOOK: " + strum); var sum = 0; 

debug("1", "2", "3", mul, "--3", add, log, "2+1;", "3+4", "3+7", eval, mul, div, log);
debug("test 1", "test 2", "--2", log, "2+1", "3+4", "3+7","--1", eval, mul, div, log);
debug("test 1", "test 2", "test 3", log);
*/
