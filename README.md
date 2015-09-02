# javascript-debugger-tester
Debug/Test javascript code with one line debug() statements with infinite possible combinations of parameters and functions (object) passed in the following pattern:

"^debug([[<?param1>.+,[ ]*]*[["[-]{2}"<?number_of_parameters_for_funct1>[0-9]+]{0,1},[ ]*<?funct>\b\w{1,}\b[ ]*]+]+);{0,1}$"

i.e

debug ( param11, param12..., (optional arg for funct 1 indicating no. of parameters it requires, default is 1)--(NATURAL NO.), funct11, (funct12 follows funct 11 if output of funct11 has to be passed as parameter for funct12, and so on till (n) functions; funct12..funct1n are optional, each optionally followed by argument indicating no. of parameters they expect)funct12..., param21, param22..., func21... );

eg:

debug("~print this line~1~", "~print this line~2~", "~print this line~3~", console.log, 17, 16, 15, "--3", add, "--1", funct_divide_by_3, console.log)

OUTPUT:

~print this line~1~

~print this line~2~

~print this line~3~

16

debug(funct1, funct2, funct3, funct4);

Execute funct1; Execute funct2 while passing return value of funct1 as arguments; Execute funct3 while passing return value of funct2 as arguments; Execute funct4 while passing return value of funct3 as arguments;

debug(funct1, "--0", funct2, "--0" funct3, "--0", funct4)

Execute funct1 with no arguments; Execute funct2 with no arguments; Execute funct3 with no arguments; Execute funct4 with no arguments;
