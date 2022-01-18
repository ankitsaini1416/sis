var dataJSON = {
    "contrast":{
        "name":"Contrast",
        "accessablityCode":"1",
        "data":{
            "contrast1":{
                "name":"Invert Colors",
                "functionHtmlClass":"Accessablity-Contrast-invertColors",
                "functionClass":""
            },
            "contrast2":{
                "name":"Dark Contrast",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "contrast3":{
                "name":"Light Contrast",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "contrast4":{
                "name":"Desaturate",
                "functionHtmlClass":"Accessablity-Contrast-desaturateColors",
                "functionClass":""
            }
        }
    },
    "highlightLinks":{
        "name":"Highlight Links",
        "accessablityCode":"2",
        "functionHtmlClass":"",
        "functionClass":"",
        "data":{
            "highlightLinks1":{
                "name":"Highlight Links",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },
    "biggerText":{
        "name":"Bigger Text",
        "icon":"format_size",
        "accessablityCode":"3",
        
        "data":{
            "biggerText1":{
                "name":"Bigger Text",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "biggerText2":{
                "name":"Bigger Text",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "biggerText3":{
                "name":"Bigger Text",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "biggerText4":{
                "name":"Bigger Text",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },
    "textSpacing":{
        "name":"Text Spacing",
        "accessablityCode":"4",
        "data":{
            "textSpacing1":{
                "name":"Light Spacing",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "textSpacing2":{
                "name":"Moderate Spacing",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "textSpacing3":{
                "name":"Heavy Spacing",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },
    "pauseAnimation":{
        "name":"Pause Animation",
        "invert":"",
        "accessablityCode":"5",
        "functionHtmlClass":"",
        "functionClass":"",
        "data":{
            "animation1":{
                "name":"Play Animation",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },
    "dyslexiaFriendly":{
        "name":"Dyslexia Friendly",
        "icon":"text_format",
        "accessablityCode":"6",
        "data":{
            "dyslexiaFriendly1":{
                "name":"Dyslexia Friendly",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "dyslexiaFriendly2":{
                "name":"Legible Fonts",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },

    "cursor":{
        "name":"Cursor",
        "accessablityCode":"7",
        "data":{
            "cursor1":{
                "name":"Big Cursor",
                "functionHtmlClass":"",
                "functionClass":""
            },
            "cursor2":{
                "name":"Reading Mask",
                "functionHtmlClass":"",
                "functionClass":""
            },

            "cursor3":{
                "name":"Reading Guide",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },

    "tooltip":{
        "name":"Tooltips",
        "accessablityCode":"8",
        "data":{
            "tooltip1":{
                "name":"Tooltips",
                "functionHtmlClass":"",
                "functionClass":""
            }
        }
    },

    "lineHeight":{
        "name":"Line Height",
        "accessablityCode":"9",
        "data":{
            "lineHeight1":{
                "name":"Line Height (1.5x)",
                "functionHtmlClass":"",
                "functionClass":"lineHeight1"
            },
            "lineHeight2":{
                "name":"Line Height (1.75x)",
                "functionHtmlClass":"",
                "functionClass":"lineHeight2"
            },
            "lineHeight3":{
                "name":"Line Height (2x)",
                "functionHtmlClass":"",
                "functionClass":"lineHeight3"
            }
        }
    },

    "resetAll":{
        "name":"Reset All",
        "accessablityCode":"10",
        "functionHtmlClass":"",
        "functionClass":""
    }
};
var materialIconsLink = `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`;
var jQueryLink = `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>`;
jQuery(document).ready(function(){
    jQuery("head").append(materialIconsLink);
    jQuery("head").append(jQueryLink);
    jQuery("body").prepend(getTemplate(dataJSON));
    loadInitial();
    getStorageContent();
    closeAccessablity();
})

jQuery(document).mouseup(function(event){
    var container = jQuery(".JS_accessablityContainer");
    if(!container.is(event.target) && container.has(event.target).length === 0){
        closeAccessablity();
    }
})

function getTemplate(data){
    var template = `<div class="user-accessablity-container JS_accessablityContainer">
      <div class="accessablity-header JS_accessablityHeader">
        <a href="javascript:void(0);" class="accessablity-link JS_accessablityLink" onclick="openAccessablity(this);">
          <span class="material-icons icon">accessibility_new</span>
        </a>
      </div>
      <div id="accessablityBody" class="accessablity-body JS_accessablityBody">
        <div class="accessablity-menu-header JS_accessablityMenuHeader">
          <h3 class="JS_accessablityTitle">Accessablity Menu</h3>
          <span class="JS_accessablityOff accessablity-off material-icons icon" onclick="closeAccessablity(this);">highlight_off</span>
        </div>
        <div class="accessablity-menu-body JS_accessablityMenuBody">
          <ul id="accessablityList" class="accessablity-list JS_accessablityList">${getAccessablityList(data)}</ul>
        </div>
      </div>
    </div>`;

    return template;
}

function getAccessablityList(data){
    var template="";
    jQuery.each(data,function(key,value){
        var xyz = ""
        if(isDataLength(value)){
            xyz = `data-current-step="0" data-step-count="${getObjLength(value.data)}"`;
        }
        template+=`<li id="${key}" ${xyz} data-original-name="${value.name}" class="accessablity-list-item JS_accessablityMenuItem" data-accessablity-code="${value.accessablityCode}" onclick="checkAccessablity(this);">
        <span class="accessablity-icon check-icon"></span>
        <span class="accessablity-icon functional-icon" data-icon="${key}"></span>
        <label>${value.name}</label>
        ${getSubTemplate(value)}
        </li>`;
    })
    return template;
}

function getSubTemplate(value){
    var template = "";
    var style="";
    if(isDataLength(value)){
        if(Object.keys(value.data).length <= 1){
            style = `hide`
        }
        template+=`<ul class="accessablity-bar-container JS_accessablityBarContainer ${style}" >`;
        var widthPercent = 100/getObjLength(value.data);
        var index = 0;
        jQuery.each(value.data,function(keyInner,valueInner){
            var leftPercent = widthPercent*index;
            template+= `<li data-step-id="${keyInner}" data-step-name="${valueInner.name}" data-step-class="${valueInner.functionClass}" data-html-class="${valueInner.functionHtmlClass}" class="accessablity-bar JS_accessablityBar" style="left: ${leftPercent}%;"><span></span></li>`
            index++;
        })
    }
    template+=`</ul>`;
    return template;
}


function isDataLength(obj){
    if(!("data" in obj) || obj.data=="" || Object.keys(obj).length === 0){
        return false;
    }
    else{
        return true;
    }
}

function getObjLength(obj){
    return Object.keys(obj).length;
}

function openAccessablity(){
    jQuery("#accessablityBody").show();
}

function closeAccessablity(){
    jQuery("#accessablityBody").hide();
}

function loadInitial(){
    setFontSizes();
}

function setFontSizes(){
    jQuery("body *").not("img .JS_accessablityContainer,.JS_accessablityContainer *").each(function(){
        var fontSize = parseInt(jQuery(this).css("font-size"),10);
        jQuery(this).attr("data-font-size",fontSize);
    })

    jQuery("body *").not(".JS_accessablityContainer,.JS_accessablityContainer *").each(function(){
        var lineHeight = parseInt(jQuery(this).css("line-height"),10);
        jQuery(this).attr("data-line-height",lineHeight);
    })

    jQuery("body [title]").not(".JS_accessablityContainer,.JS_accessablityContainer [title]").hover(function(){
            var text = jQuery(this).attr("title");
            var top = jQuery(this).offset().top;
            var left = jQuery(this).offset().left;
            var width = jQuery(this).outerWidth();
            var height = jQuery(this).outerHeight();
            jQuery(this).attr("data-title",text).removeAttr("title");
            jQuery(".Accessablity-tooltipContainer").show();
            jQuery(".Accessablity-tooltipContainer").css({"left":left+width+10, "top": top+height+10})
            
            jQuery(".Accessablity-tooltipContainer").text(text)
        }, function(){
            var text = jQuery(this).attr("data-title");
            jQuery(this).attr("title",text).removeAttr("data-title");
            jQuery(".Accessablity-tooltipContainer").hide();
      });

}


//accessablity functionality starts here

function checkAccessablity(thisObj){
    var code = Number(jQuery(thisObj).attr("data-accessablity-code"));
    var currentStep = Number(jQuery(thisObj).attr("data-current-step"));
    var stepLength = jQuery(thisObj).find(".JS_accessablityBar").length;
    if(currentStep != stepLength){
        jQuery(thisObj).find(".JS_accessablityBarContainer").show();
        jQuery(thisObj).addClass("active");
    }
    else{
        jQuery(thisObj).find(".JS_accessablityBarContainer").hide();
        jQuery(thisObj).removeClass("active");
    }

    switch(code){
        case 1:
            contrast(thisObj);
            break;
        case 2:
            highlightLinks(thisObj);
            break;
        case 3:
            changeText(thisObj);
            break;
        case 4:
            changeSpacing(thisObj);
            break;
        case 5:
            changeAnimation(thisObj);
            break;
        case 6:
            changeFont(thisObj)
            break;
        case 7:
            changeCursor(thisObj)
            break;
        case 8:
            changeTooltip(thisObj)
            break;
        case 9:
            changeLineSpacing(thisObj)
            break;
        case 10:
            resetAll(thisObj)
            break;
        default:
            console.log(1)
            break;
    }
    setStorageContent();

    var array = getStorageArray();
    if(Object.keys(array).length){
        jQuery(".JS_accessablityLink").append('<span class="material-icons check-icon-header">task_alt</span>');
    }
    else{
        jQuery(".JS_accessablityLink .check-icon-header").remove();
    }
}






function setStorageContent(){
    jQuery(".JS_accessablityMenuItem").each(function(){
        if(jQuery(this).attr("id")!="resetAll"){
            var currentObj = {
                current_step:jQuery(this).attr("data-current-step"),
                total_step:jQuery(this).attr("data-step-count"),
                id:jQuery(this).attr("id"),
                code:jQuery(this).attr("data-accessablity-code"),
            }
    
            localStorage.setItem("Accessablity_"+currentObj.id,currentObj.current_step);
        }
    })
}

function getStorageArray(){
    var array = {};
    Object.keys(localStorage).forEach((key) => {
        if(/^Accessablity_/.test(key)){
            var id = key.replace("Accessablity_","");
            var value = Number(localStorage.getItem(key));
            if(value>0){
                for(var i=0;i<value;i++){
                    array[id]= value;
                }
            }
        }
    });
    return array;
}

function getStorageContent(){
    var array = getStorageArray();
    if(Object.keys(array).length){
        jQuery(".JS_accessablityLink").append('<span class="material-icons check-icon-header">task_alt</span>');
    }
    else{
        jQuery(".JS_accessablityLink .check-icon-header").remove();
    }

    jQuery.each(array,function(key,value){
        for(var i=0;i<value;i++){
            jQuery(".JS_accessablityMenuItem#"+key).trigger("click");
        }
    })
}

function changeLineSpacing(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);

        switch(currentActionId){
            case "lineHeight1":
                jQuery("html").addClass("Accessablity-LineHeight-1");
                setLineHeight(1.5)
                break;

                case "lineHeight2":
                    jQuery("html").removeClass("Accessablity-LineHeight-1");
                    setLineHeight(1.75)
                    jQuery("html").addClass("Accessablity-LineHeight-2");
                break;

                case "lineHeight3":
                    jQuery("html").removeClass("Accessablity-LineHeight-2");
                    setLineHeight(2)
                    jQuery("html").addClass("Accessablity-LineHeight-3");
                break;

                case "Reset":
                    // jQuery("html").removeClass("lineHeight3");

                    jQuery("html").removeClass(function (index, className) {
                        return (className.match (/(^|\s)Accessablity-LineHeight-\S+/g) || []).join(' ');
                    });
                    
                    setLineHeight(1)
            break;
        default:
            break;
        }
    }
}

function setLineHeight(num){
    jQuery('[data-line-height]').each(function(){
        var currentLineHeight = Number(jQuery(this).attr("data-line-height"));
        var requiredLineHeight = currentLineHeight*num;
        jQuery(this).css("line-height",requiredLineHeight+"px");
    })
}

function resetAll(thisObj){
    //setPreviousStyle(jQuery("*").not(".JS_accessablityContainer *"));
    jQuery("*").removeClass(function (index, className) {
        return (className.match (/(^|\s)Accessablity-\S+/g) || []).join(' ');
    });

    
    jQuery(".JS_accessablityMenuItem").attr("data-current-step",0).removeClass("active");

    jQuery(".JS_accessablityMenuItem").find("label").text(function(){
        return jQuery(this).closest(".JS_accessablityMenuItem").attr("data-original-name");
    });

    jQuery(".JS_accessablityMenuItem").find(".functional-icon").attr("data-icon", function(){
        return jQuery(this).closest(".JS_accessablityMenuItem").attr("id");
    });

    jQuery(".JS_accessablityBar").removeClass("active");
    jQuery(".JS_accessablityBarContainer").hide();
}

function changeCursor(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);
        switch(currentActionId){
            case "cursor1":
                jQuery("html").addClass("Accessablity-cursor1");
                break;
                case "cursor2":
                    jQuery("html").removeClass("Accessablity-cursor1");
                    var div1 = `<div class="Accessablity-cursor2 Accessablity-cursor2-top">
                                    <div class="Accessablity-cursor2-inner Accessablity-cursor2-top-inner">
                                    </div>
                                </div>
                                <div class="Accessablity-cursor2 Accessablity-cursor2-bottom">
                                    <div class="Accessablity-cursor2-inner Accessablity-cursor2-bottom-inner">
                                    </div>
                                </div>`;
                    
                    jQuery("body").append(div1);
                    setReadingMask();
                    break;

                    case "cursor3":
                        jQuery(".Accessablity-cursor2").remove();
                        var div2 = `<div class="Accessablity-cursor3">
                                        <div class="Accessablity-cursor3-inner">
                                        </div>
                                    </div>`;
                                    jQuery("body").append(div2);
                                    setReadingGuide();
                        break;

                case "Reset":
                    jQuery(".Accessablity-cursor3").remove();
            break;
        default:
            break;
        }
    }
}

function setReadingMask(){
    var readingMaskLength = jQuery(".Accessablity-cursor2").length;
    if(readingMaskLength == 2){
        jQuery( document ).on( "mousemove", function( event ) {
            var top = event.clientY - 40;
            var bottom = jQuery(window).height()-event.clientY - 40;
            if(top < 0){
                top = 0;
            }
            if(bottom < 0){
                bottom = 0;
            }
            jQuery(".Accessablity-cursor2-top").css("height",top)
            jQuery(".Accessablity-cursor2-bottom").css("height",bottom)
          });
        
    }
}

function setReadingGuide(){
    var readingGuideLength = jQuery(".Accessablity-cursor3").length;
    if(readingGuideLength){
        jQuery( document ).on( "mousemove", function( event ) {
            jQuery(".Accessablity-cursor3").css({"display":"block","top":event.pageY-20,"left":event.pageX})
        });
    }
}

function changeFont(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);


        switch(currentActionId){
            case "dyslexiaFriendly1":
                jQuery("html").addClass("Accessablity-font1");
                
                break;

                case "dyslexiaFriendly2":
                    jQuery("html").removeClass("Accessablity-font1");
                    jQuery("html").addClass("Accessablity-font2");
                break;

                case "Reset":
                    // jQuery("html").removeClass("Accessablity-font2");
                    jQuery("html").removeClass(function (index, className) {
                        return (className.match (/(^|\s)Accessablity-font\S+/g) || []).join(' ');
                    });
                    
            break;
        default:
            break;
        }
    }
}



function changeTooltip(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);
        switch(currentActionId){
            
            case "tooltips1":
                jQuery("body").append('<div class="Accessablity-tooltipContainer"></div>');
                break;

                case "Reset":
                    jQuery(".Accessablity-tooltipContainer").remove();
            break;
        default:
            break;
        }
    }
}

function changeAnimation(thisObj){

var isStepCount = jQuery(thisObj).attr("data-step-count");
if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);
        switch(currentActionId){
            case "animation1":
                jQuery("html").addClass("Accessablity-offTransition");
                break;

                case "Reset":
                    // jQuery("html").removeClass("Accessablity-offTransition");
                    jQuery("html").removeClass(function (index, className) {
                        return (className.match (/(^|\s)Accessablity-offTransition\S+/g) || []).join(' ');
                    });
                    
            break;
        default:
            break;
        }
    }
}


function changeSpacing(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";


        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);

        switch(currentActionId){
            case "textSpacing1":
                jQuery("html").addClass("Accessablity-spacing1");
                
                break;

                case "textSpacing2":
                    jQuery("html").removeClass("Accessablity-spacing1");
                    jQuery("html").addClass("Accessablity-spacing2");
                break;

                case "textSpacing3":
                    jQuery("html").removeClass("Accessablity-spacing2");
                    jQuery("html").addClass("Accessablity-spacing3");
                break;

                case "Reset":
                    // jQuery("html").removeClass("Accessablity-spacing3");
                    jQuery("html").removeClass(function (index, className) {
                        return (className.match (/(^|\s)Accessablity-spacing\S+/g) || []).join(' ');
                    });
            break;
        default:
            break;
        }
    }
}


function changeText(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);


        switch(currentActionId){
            case "biggerText1":
                jQuery('[data-font-size]').each(function(){
                    var fontSize = Number(jQuery(this).attr("data-font-size"));
                    var percentageIncrement = 1.1;
                    var className = setFontSize(fontSize,percentageIncrement);
                    jQuery(this).addClass(className);
                })
                break;

                case "biggerText2":
                jQuery('[data-font-size]').each(function(){
                    var fontSize = Number(jQuery(this).attr("data-font-size"));
                    var percentageIncrement = 1.2;
                    var className = setFontSize(fontSize,percentageIncrement);
                    jQuery(this).addClass(className);
                })
                break;

                case "biggerText3":
                jQuery('[data-font-size]').each(function(){
                    var fontSize = Number(jQuery(this).attr("data-font-size"));
                    var percentageIncrement = 1.3;
                    var className = setFontSize(fontSize,percentageIncrement);
                    jQuery(this).addClass(className);
                })
                break;

                case "biggerText4":
                jQuery('[data-font-size]').each(function(){
                    var fontSize = Number(jQuery(this).attr("data-font-size"));
                    var percentageIncrement = 1.4;
                    var className = setFontSize(fontSize,percentageIncrement);
                    jQuery(this).addClass(className);
                })
                break;
                case "Reset":
                    jQuery('[data-font-size]').removeClass (function (index, className) {
                        return (className.match (/(^|\s)Accessablity-font_\S+/g) || []).join(' ');
                    });
                    // jQuery('[data-font-size]').each(function(){
                    //     var fontSize = Number(jQuery(this).attr("data-font-size"));
                    //     var percentageIncrement = 1;
                    //     var className = setFontSize(fontSize,percentageIncrement);
                    //     jQuery(this).addClass(className);
                    // })
            break;
        default:
            
            break;
        }
    }
}

function setFontSize(actualsize,percentageIncrement){
    var desiredFontSize = Math.ceil(actualsize*percentageIncrement);
    var fontSize;
    if(desiredFontSize<=16){
        fontSize=16;
    }

    if(desiredFontSize>16 && desiredFontSize<=24){
        fontSize=24;
    }

    if(desiredFontSize>24 && desiredFontSize<=32){
        fontSize=32;
    }

    if(desiredFontSize>32 && desiredFontSize<=40){
        fontSize=40;
    }

    if(desiredFontSize>40 && desiredFontSize<=48){
        fontSize=48;
    }

    if(desiredFontSize>48 && desiredFontSize<=56){
        fontSize=56;
    }

    if(desiredFontSize>56 && desiredFontSize<=64){
        fontSize=64;
    }

    if(desiredFontSize>64 && desiredFontSize<=72){
        fontSize=72;
    }

    if(desiredFontSize>72 && desiredFontSize<=80){
        fontSize=80;
    }

    var className = "Accessablity-font_"+fontSize;

    return className;

}

function getObjectFromReference(path){
    var pathArray = path.split(".");
    var obj = Object.assign({}, dataJSON);
    var parentObj = {};
    var currentKey = "";
    jQuery.each(pathArray,function(key,value){
        parentObj = Object.assign({}, obj);
        obj = obj[value];
        currentKey = value;
    })
    var parentObjKeys = Object.keys(parentObj);
    var currentIndex = parentObjKeys.indexOf(currentKey);
    var prevKey = parentObjKeys[-1];
    var nextKey = parentObjKeys[parentObjKeys.indexOf(currentKey)+1];
    return {
        parentObj:parentObj,
        currentObj:obj,
        prevObj:parentObj[prevKey],
        nextObj:parentObj[nextKey]
    }
}

function contrast(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));

        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";

        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);

        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }

        
        jQuery(thisObj).attr("data-current-step",currentActionCount);

        
        
        switch(currentActionId){
            case "contrast1":
                jQuery("html").addClass("Accessablity-Contrast-invertColors");
            break;
        case "contrast2":
                jQuery("html").removeClass("Accessablity-Contrast-invertColors");
                jQuery("html").addClass("Accessablity-Contrast-darkContrast");
            break;
        case "contrast3":
                jQuery("html").removeClass("Accessablity-Contrast-darkContrast");
                jQuery("html").addClass("Accessablity-Contrast-lightContrast");
            break;
        case "contrast4":
                jQuery("html").addClass("Accessablity-Contrast-desaturateColors");
            break;

            case "Reset":
                jQuery("html").removeClass(function (index, className) {
                    return (className.match (/(^|\s)Accessablity-Contrast-\S+/g) || []).join(' ');
                });
            break;
        default:
            
            break;
        }
    }
    
}

function highlightLinks(thisObj){
    var isStepCount = jQuery(thisObj).attr("data-step-count");
    if(isStepCount){
        var currentCount = Number(jQuery(thisObj).attr("data-current-step"));
        var totalCount = Number(jQuery(thisObj).attr("data-step-count"));
        var currentActionCount = 0;
        var currentActionName ="";
        var currentActionId = "";
        var currentActionClass = "";
        var currentActionHtmlClass = "";
        if(currentCount >= totalCount){
            currentActionCount = 0;
            currentActionId = "Reset";
            jQuery(thisObj).find(".JS_accessablityBar").removeClass("active");
            var originalName = jQuery(thisObj).attr("data-original-name");
            var originalId = jQuery(thisObj).attr("id");
            jQuery(thisObj).find("label").text(originalName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", originalId);
        }
        else{
            currentActionCount = currentCount+1;
            currentActionName = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-name");
            currentActionId = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-id");
            currentActionClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-step-class");
            currentActionHtmlClass = jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).attr("data-html-class");

            jQuery(thisObj).find(".JS_accessablityBar").eq(currentActionCount-1).addClass("active");
            jQuery(thisObj).find("label").text(currentActionName);
            jQuery(thisObj).find(".functional-icon").attr("data-icon", currentActionId);
        }
        
        jQuery(thisObj).attr("data-current-step",currentActionCount);
        switch(currentActionId){
            case "highlightLinks1":
                jQuery("html").addClass("Accessablity-highlightLinks");
                break;

                case "Reset":
                    jQuery("html").removeClass("Accessablity-highlightLinks");
            break;
        default:
            
            break;
        }
    }
}

function getPreviousStyle(element){
    element.each(function(){
        var currentStyle = jQuery(this).attr('style');
        jQuery(this).attr("data-style", currentStyle);
    })
}

function setPreviousStyle(element){
    element.each(function(){
            var previousStyle = jQuery(this).attr("data-style")
            if(previousStyle){
                jQuery(this).attr('style',previousStyle);
            }
            else{
                jQuery(this).removeAttr("style");
            }
        })
}