var myCash =5000; //cash on hand
var distribute = 0;//amt of distributors below you
var Products = 0;//products on hand
var Time = new Date(2000,0,1); //Time, the stat for game balance
var Prod_Cost = Math.round(4*(Math.pow(1.08,Math.random()*30)))+1; //cost for a item
var Population_local = 5000000;
//var, for city, use 5 million
//var, for country, use 500 million
//var, population world, use 8 billion
var Population_Framily = 50; //bonus for social media
var abilitySelling= 5;//Increase amt sold over time
var abilityRecruiting=5;//Increase recruit over time
var monthlyCash=0;//nice stats
var monthlyLoss=0;//Get some nice statistics
var adTimer = 0; //Use to stop ad spam
var SMTimer =0; //Use to stop social media spam
var RepSuccess=0; //Change do reduce success in reputation events
var Pyr_Layers=[6,36,216,1296,7776,46656,279936,1679616,10077696,60466176,363797056
,2176782336,13060694016,78364164096]; //layers in  a pyramid
var Tips=["Low sales may be due too overpriced products",
"Luckily, you don't have any living expenses, but your family has mixed feelings about you.",
"Remember to use sunscreen even when it's cloudy.","Buying in bulk will reduce costs",
"that 5000$ you started with was your uncles retirement fund",
"Recruiting distributors will really help you"];
var Rep = 0; //dereases scheme operations, how much is known about pyramid scheme
var OwnRep =0; //seperate Rep adds to form Rep
var PyrRep=0; //seperate Rep, adds to form Rep
var NumberRep=[0,1000,1000000,1000000000,1000000000000,1000000000000000];
var NumberName=["","k","M","B","T","Q"];
var ActionHist =["Nothing"];
var yourLayer=Math.round(Math.random()*4);


function addPrompt(Say, Type) { //adds a "aPrompt" class to the first div
    var aTempClass = document.getElementById(Type);
    var node = document.createElement("div");
    node.className="aPrompt";
    var aX = document.createElement("span");
    aX.onclick = function() {
        this.parentElement.parentElement.removeChild(this.parentElement);
    }
    aX.className="aExit";
    aX.textContent="\xa0 x \xa0";
    var tNode = document.createTextNode(Say.toString());
    node.appendChild(aX);
    node.appendChild(tNode);
    document.getElementById(Type.toString()).insertBefore(node,aTempClass.childNodes[0]);

}

function Selling() { //Specific calc for selling
    var Offer = document.getElementById("Offer").valueAsNumber; //getting offer value
    var aTemp = document.getElementById("theMedium");
    var Medium = aTemp.options[aTemp.selectedIndex].value;

    //aTemp = document.getElementById("theTarget");
    //var Target = aTemp.options[aTemp.selectedIndex].value;

    if(Products >0)
    {
        //console.log("Producst above 1")
        if(Offer < Prod_Cost*4)
        {
            
            var howMuchProd = Math.round(Math.random() * abilitySelling); //math
            if(Medium=="1")
            {
                changeTime(48+Math.round(Math.random()*240));
                if(adTimer >0)
                    adTimer--;
                if(SMTimer >0)
                    SMTimer=0;
                
            }
            //console.log("hello")
            if(Medium=="2")
            {
                changeTime(24);
                howMuchProd=Math.round(Population_Framily/8);
                Population_Framily=Math.round(Population_Framily*.9)-2;
                if(SMTimer>0)
                howMuchProd-=SMTimer;
                SMTimer++;
                console.log(Population_Framily);

            }
            if(Medium=="3")
            {
                changeTime(6)
                howMuchProd+=Math.round(Population_local*Math.random()*.1) -(adTimer*4);
                
            }
 
            //if(overUsed("Selling"))
              //  howMuchProd=Math.round(howMuchProd/1.2);
            if(Rep>8)
                howMuchProd-=3;
            if(howMuchProd > Products)
                howMuchProd = Products;
            if(Offer > Prod_Cost*3) //prevent putting a high price
                howMuchProd = Math.round(howMuchProd/4);
            else if(Offer > Prod_Cost*2)
                howMuchProd = Math.round(howMuchProd/3.0)
            else if(Offer > Prod_Cost*1.8)
                howMuchProd = Math.round(howMuchProd/2)
            else if(Offer >Prod_Cost*1.5)
                howMuchProd =Math.round(howMuchProd/1.5)
            if(howMuchProd >0) //check for products available
            {
                document.getElementById("News_Selling").innerHTML="You sold "+howMuchProd+" product(s) for "+Offer*howMuchProd+"$";
                changeCash(Math.round(Offer*howMuchProd));
                changeProd(howMuchProd*-1);                
            }
            else 
                document.getElementById("News_Selling").innerHTML="No buyers this time";
        }
        else
            document.getElementById("News_Selling").innerHTML = "No buyers, price may be too high";
        
    }
    else
        document.getElementById("Prod_F").style.color="red";
    //ActionHist.push("Selling");
    setTimeout(revertRed,1000);
    function revertRed() {
        document.getElementById("Prod_F").style.color = "black";
    }
    changeRep(.05,.05);
    /*if(Medium!="2")
    {
    if(abilitySelling<3)
        abilitySelling+=.05;
    else if(abilitySelling <9)
        abilitySelling+=.025;
    else if(abilitySelling <27)
        abilitySelling+=.01;
    //console.log(abilitySelling);
    changePyrInfo(.15);

    }*/
    
    
}
function start() { //Functions ran when you pay the start fee
    hide_Class("PayUp0");
    show_Class("PayUp1");
    show_Class("Buy0");
    show_Class("shopContent");
    Tips.push("A portion of your sales is deducted every month");
    addPrompt("You'll earn a discount when purchasing productsin bulk! Also, when paying the mandatory fees every month, you'll recieve some free products!","flex_News");
    changeProd(Math.ceil(250/Prod_Cost));
    document.getElementById("theCostforOne").innerHTML = "(" + Prod_Cost + "$ each)";
    document.getElementById("currentBuying").innerHTML = document.getElementById("BuySlider").valueAsNumber;
}

function stop() { //functions ran when you cancel
    hide_Class("PayUp1");
    show_Class("PayUp0");
    hide_Class("Buy0");
    hide_Class("shopContent");
}

function hide_Class(theClass) { //hiding all the children of the given class
    var aTemp = document.getElementsByClassName(theClass);
    for(var i = 0; i < aTemp.length ; i++)
    {
        aTemp[i].style.display = "none";
    }
}

function show_Class(theClass) { //cancels out hide_Class
    var aTemp = document.getElementsByClassName(theClass);
    for(var i = 0; i < aTemp.length; i++)
    {
        aTemp[i].style.display = "block";
    }
}
function getAbbrev(theNumber,decimalAmt)
{
    var i =0;
    while(theNumber>=NumberRep[i])
        i++;
    return ((theNumber/(NumberRep[--i]+1)).toFixed(decimalAmt)+NumberName[i]);
}

function changePyrInfo()
{
    var tempString="";
    if(Rep<=0)
    tempString="High";
    else if(Rep<=1)
    tempString="Moderate";
    else if(Rep<=3)
    tempString="Fairly moderate";
    else if(Rep<=5)
    tempString="Somewhat moderate";
    else if(Rep<=8)
    tempString="Barely moderate";
    else if(Rep<=12)
    tempString="Somewhat low";
    else if(Rep<=17)
    tempString="low";
    else if(Rep<=23)
    tempString="Very low";
    else
    tempString="Trash";
    document.getElementById("displayPublicKnow").innerText="Reputation:"+tempString;
}
function changeRep(PRep,RepOwn)
{
    if(PyrRep+PRep<0)
    PyrRep=0;
    else
    PyrRep+=PRep;
    if(OwnRep+RepOwn <0)
    OwnRep=0;
    else
    OwnRep+=RepOwn;

    Rep=OwnRep+PyrRep;
    changePyrInfo();
}
function changeCash(Differ)
{
    if(Differ >0)
    monthlyCash+=Differ;
    else
    monthlyLoss+=-1*Differ;
    myCash+=Differ;
    document.getElementById("money_F").innerHTML="$"+getAbbrev(myCash,1);
}
function changeDis(Differ)
{
    temp=0;
    while(Pyr_Layers[temp]<distribute)
        temp++;
    if(Differ>0)
    {
    changeCash(Math.round(100*Differ*Math.pow(.5,temp+1)));
    }
    if(Differ+distribute<0)
    distribute=0;
    else
    distribute+=Differ;

    if(distribute<1000)
        document.getElementById("Dis_F").innerHTML=getAbbrev(distribute,0)+" distributors";
    else
        document.getElementById("Dis_F").innerHTML=getAbbrev(distribute,1)+" distributors";
    Population_local=Population_local-Differ;

}
function changeProd(Differ)
{
    Products+=Differ;
    if(Products<1000)
    document.getElementById("Prod_F").innerHTML=getAbbrev(Products,0)+" products";
    else
    document.getElementById("Prod_F").innerHTML=getAbbrev(Products,1)+" products";

}
function changeTime(Differ) //function for changing time, timers, and decide what to change at date intervals
{
    var tempYear = Time.getFullYear();
    var tempMonth = Time.getMonth();
    Time.setHours(Time.getHours() +Differ)
    document.getElementById("theTime").innerHTML = Time.getFullYear()+"/"+Time.getMonth()+"/"+Time.getDate()+ " (Year/Month/Day)";

    if(Time.getMonth() >tempMonth)
    {
        //abilitySelling+=.02;
        disEarning();
        changeCash(-200+(Math.round(monthlyCash*-.1)));
        changeProd(Math.ceil(200/Prod_Cost))
        //console.log(-20+(Math.round(monthlyCash*-.1)))
        Population_Framily+=3;
        addPrompt("You earned "+monthlyCash+"$ this month, and lost "+monthlyLoss+"$.","flex_News");
        monthlyCash=0;monthlyLoss=0;
        //if(distribute>20 && Math.round(distribute*.05*Rep) <20)
        if(Rep >5)
        {
        if(Rep<20)
        changeDis(-1*Math.round(distribute*.025*Rep));
        else
        changeDis(-1*Math.round(distribute*.5));
        }

        //changeRep(0,-1*(Rep*.1));
        overUsed("");
    }
    if(Time.getFullYear() > tempYear)
    {
        
    }

    if(adTimer=3)
    {
    adTimer=0;
    }
}
//the 2 methods for checking cash for changing & buying
function checkCash(Amt)
{
    
    var aTemp = true;
    if(myCash+Amt <0)
    {
        document.getElementById("money_F").style.color="red";
        aTemp=false;
    }
    else
        changeCash(Amt);
    setTimeout(revertRed,1000);
    function revertRed() {
        document.getElementById("money_F").style.color = "black";
    }
    return aTemp;
}
function checkCash_Prod(Amt) //decide cost for buying products
{
    var amtOff="";
    if(Amt<-12000)
    {Amt=Math.round(Amt*.5);amtOff="50%";}
    else if(Amt<-10000)
    {Amt=Math.round(Amt*.60);amtOff="40%";}
    else if(Amt<-8000)
    {Amt=Math.round(Amt*.70);amtOff="30%";}
    else if(Amt<-6000)
    {Amt=Math.round(Amt*.75);amtOff="25%";}
    else if(Amt<-4000)
    {Amt=Math.round(Amt*.8);amtOff="20%";}
    else if(Amt< -2000)
    {Amt=Math.round(Amt*.85);amtOff="15%";}
    else if(Amt < -1000)
    {Amt=Math.round(Amt*.90);amtOff="10%";}
    else if(Amt < -500)
    {Amt=Math.round(Amt*.95);amtOff="5%";}
    var aTemp = true;
    if(myCash+Amt <0)
    {
        document.getElementById("money_F").style.color="red";
        aTemp=false;
    }
    else
    {
        changeCash(Amt);
        if(amtOff!="")
        addPrompt("For purchasing "+document.getElementById("BuySlider").valueAsNumber+ 
        " products, you got "+amtOff+" off","flex_News");

    }
    setTimeout(revertRed,1000);
    function revertRed() {
        document.getElementById("money_F").style.color = "black";
    }
    return aTemp;
}
//The nice tabs with coloor changing buttons
function openTab(evt, TabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function killChildAll(Type) { //gets a div by a id & removes all of its children
    var myNode = document.getElementById(Type.toString(0))
    while(myNode.firstChild)
    {
        myNode.removeChild(myNode.firstChild);
    }    
}


function disEarning() { //Decide money made from distributors
    var temp = 0;
    var tempDis = distribute;
    while(Pyr_Layers[temp]<tempDis)
    {
        //console.log(tempDis);
        changeCash(Math.round(Pyr_Layers[temp]*400*(Math.pow(.1,temp+1))));
        tempDis-=Pyr_Layers[temp];
        temp++;
    }
    changeCash(Math.round(tempDis*200*Math.pow(.08,temp)));
    //console.log(monthlyCash);
}

function startAuto() { //the automatic time passer start
    auto = setInterval(function() {changeTime(24)},500);
    document.getElementById("autoTime").value = "Cancel";
    document.getElementById("autoTime").onclick=function() {stopAuto()};
}
function stopAuto() { //stops startAuto()
    clearInterval(auto);
    document.getElementById("autoTime").value = "Click to pass time automatically";
    document.getElementById("autoTime").onclick=function() {startAuto()}
}
function TipFunc() {addPrompt(Tips[Math.round(Math.random()*(Tips.length-1))],"flex_News");}
function Recruit(){
    changeTime(52);
    var aTemp = document.getElementById("Options_Dropdown");
    recruitAmt=0;
    var Target = aTemp.options[aTemp.selectedIndex].value;
    if(Target=="1")
    {
        recruitAmt=Math.round((Population_Framily/10));
        changeRep(0.1,0.3);
    }
    else if(Target=="2")
    {
        var i=0;
        var temp=0;
        while(distribute >temp && i!=Pyr_Layers.length-1 )
        {
            temp+=Pyr_Layers[i];
            i++;
        }
        //console.log(temp);
        temp=Math.round(temp-distribute);
        //if(temp>500)
        //recruitAmt+=Math.round(Math.random()*(distribute-temp))
        recruitAmt=Math.round((temp/Rep));
        changeRep(.1,.1);

    }
    else if(Target=="3")
    {
        if(distribute>(Population_local/20))
            recruitAmt-=5;
        else 
            recruitAmt+=Math.round(Math.random()*1);
    }
    //console.log(recruitAmt);
    //recruitAmt=Math.round((recruitAmt-(Rep^3))/2);
    //console.log(recruitAmt);
    if(overUsed("Recruit")>5)
        recruitAmt=Math.round(recruitAmt/2);

    //console.log(overUsed("Recruit"));
    if(recruitAmt>0)
    {
        if(Target=="1" && Population_Framily>0)
        {
            Population_Framily=Population_Framily/2-5;
        }
        changeDis(recruitAmt);
        changeTime(48);
        changeRep(0.1,0.1);
    }
    if(recruitAmt>-1)
    document.getElementById("recInfo").innerHTML=getAbbrev(recruitAmt,0)+" distributors recruited";
    else
    document.getElementById("recInfo").innerHTML="0 distributors recruited";
    if(overUsed("Recruit")>5)
    {
    document.getElementById("recInfo").innerText=
    document.getElementById("recInfo").innerText+". Action has been overused(decreased effectivness)"
    }
    changeRep(0.1,0.1);
    
    ActionHist.push("Recruit");

}

function overUsed(temp)
{
    
    var count=0;
    if(ActionHist.length>2)
    {
        while(ActionHist.length>10 )
            ActionHist.splice(0,1);
        //var count=0;
        for(var i=0; i<10; i++)
        {
            //console.log(ActionHist[i]);
            if(ActionHist[i]==temp)
                count++;
            //console.log(count);
        }
        //return count;
    }
    if(document.getElementById("RepHint").innerText.includes("Action"))
    {
        document.getElementById("RepHint").innerText=
        document.getElementById("RepHint").innerText.substring(0,7);
        
    }
    if(document.getElementById("recInfo").innerText.includes("Action"))
    {
        document.getElementById("recInfo").innerText=
        document.getElementById("recInfo").innerText.substring(0,document.getElementById("recInfo").innerText.substring.length)

    }
     return count;   
}
function RepEvents()
{
    var temp = document.getElementById("theMedium");
    var Target=temp.options[temp.selectedIndex].value;
    RepSuccess=Math.random();
    if(overUsed("RepEvents")>2)
    {
        //console.log(RepSuccess);
        //console.log("heh");
        RepSuccess=RepSuccess/3;
        //document.getElementById("RepHint").innerHTML="hrhsg";
        //document.getElementById("RepHint").innerText+". Action has been overused(decreased effectivness)";
        if(overUsed("RepEvents")>5)
            RepSuccess=0;
        //console.log(RepSuccess);
    }
    if(Target==1)
    {
        //console.log("Hello")
        changeTime(12);
        if(RepSuccess>.50)
        {
            Population_Framily+=20;
            changeRep(0,-.5);
            document.getElementById("RepHint").innerText="Success";
        }
        else
        {
            document.getElementById("RepHint").innerText="Failure";
        }
    }

    
    if(overUsed("RepEvents")>3)
    {
        document.getElementById("RepHint").innerHTML=
        document.getElementById("RepHint").innerText+". Action has been overused(decreased effectivness)";
    }

    ActionHist.push("RepEvents");
    //console.log(RepSuccess);
}
//Functions to call at the start of page loading
//var tipRunner = setInterval(function(){TipFunc()},120000);
changeCash(0);
changeDis(0);
changeProd(0);
changeTime(0);
addPrompt("Tip : check out the shop, and don't forget to check back here once in awhile", "flex_News");
//openTab(document.getElementById("tabNews"), 'News');
document.getElementById("tabNews").click();


