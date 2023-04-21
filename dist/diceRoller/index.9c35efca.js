const btnRoll=document.querySelector(".roll"),btnExpound=document.querySelector(".expound"),btnHide=document.querySelector(".hide"),input=document.querySelector(".dice"),printout=document.querySelector(".printout"),print=document.querySelector(".print"),details=document.querySelector(".details"),oneDieReg=RegExp(/\d{1,2}d\d{1,3}/,"gd"),equationRegEx=RegExp(/[^0-9/*+()-]/);function handleDie(e){return rollOneSizeDie(parseOneDie(e))}function parseOneDie(e){return dIndex=e.indexOf("d"),[Number(e.substring(0,dIndex)),Number(e.substring(dIndex+1,e.length))]}function rollOneSizeDie(e){let t=[],n=0,l=e[1],i=0;for(let r=0;r<e[0];r++)i=Math.trunc(Math.random()*l)+1,n+=i,t.push(`${i} (d${l})`);return[n,t]}function replaceDice(e){let t=e.matchAll(oneDieReg),n=[];for(const l of t){let[t,i]=handleDie(l[0]);n=[...n,...i],e=e.replace(l[0],t)}return[e,n]}function rollDice(rollIn){let[repStr,rollsActual]=replaceDice(rollIn),roll="";return roll=equationRegEx.test(repStr)?"invalid expression":eval(repStr),[roll,rollsActual]}function printRolls(e){let t,n=e[0];t=isNaN(n)?"Invalid Roll Expression":`You rolled a ${Math.trunc(n)}!!`,printout.classList.remove("hidden"),print.textContent=t,printDetails(e)}function printDetails(e){let t=`You rolled a ${e[1][0]}`;console.log(e);for(let n=1;n<e[1].length-1;n++)t+=", "+e[1][n];e[1].length>1&&(t+=", and a "+e[1][e[1].length-1]),details.textContent=t}btnRoll.addEventListener("click",(function(e){e.preventDefault();let t=input.value.replace(/\s+/g,"");printout.classList.add("hidden"),details.classList.add("hidden"),btnHide.classList.add("hidden"),printRolls(rollDice(t))})),btnExpound.addEventListener("click",(function(){btnHide.classList.remove("hidden"),details.classList.remove("hidden")})),btnHide.addEventListener("click",(function(){details.classList.add("hidden"),btnHide.classList.add("hidden")}));
//# sourceMappingURL=index.9c35efca.js.map
