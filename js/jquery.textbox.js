/**
 * jQuery.TextBoxy
 * Copyright (c) 2008 HyperNumbers.com
 * All rights reserved.
 * @projectDescription A Text input combined with a select box
 * @author Dale Harvey
 * @version 0.1
 */

(function($) 
{
    $.fn.textbox = function(options) 
    {
        $.fn.textbox.defaults = 
        {
            items:[],
            onSelect:null,
            onChange:null
        };
        
        var o = $.extend({}, $.fn.textbox.defaults, options);
            
        /**
        * Entry point
        */   
        return this.each(function() 
        {
            var $t   = $(this);
            var $inp = this;
            
            var top  = $t.offset().top;
            var left = $t.offset().left;
            var height = this.offsetHeight;
            var width  = this.offsetWidth;
            
            var root = $t.wrap("<div class='textbox' />").parent();
            root.width(width);
            
            // The drop down list of items
            var list = $("<ul />").appendTo(root).width(width
            ).css("top",(top + height) + "px"
            ).mousedown(function(e)
            {
                list.toggle();
                $t.val($(e.target).text());
                
                if(typeof o.onSelect == "function")
                   o.onSelect($(e.target).text());
            });
            
            var arrow = $("<div class='arrow' />").prependTo(root
            ).css("top", ((top  + (height/2)) - 8)+"px"
            ).css("left",((left + width) - 16)+"px"
            ).mousedown(function()
            {
                list.toggle();
            });
            
            $(window).resize(function()
            {
                arrow.css("left",(($t.offset().left + width) - 16)+"px");    
            });
            
            this.textBoxObj = new Object();
            this.textBoxObj.add = function(item)
            {
                list.append($("<li />").append($("<a>"+item+"</a>")));
            };
            
            $t.click(function()
            {
                this.select();
            }
            ).focus(function()
            {
                var val = $(this).val();
                this.select();
                
                $(this).bind('blur',function()
                {
                    $(this).unbind("blur").unbind("keyup");
                    
                    if(typeof o.onChange == "function"
                       && $(this).val() != val
                       && $(this).val() != "")
                    {
                        o.onChange($(this).val());
                    }
                }
                ).bind('keyup',function(e)
                {
                    if(e.keyCode == 13)
                    {
                        $(this).unbind("keyup");
                        $(this).blur();
                    }
                });
            });
            
            $.each(o.items,function(i)
            {
                $inp.textBoxObj.add(this);
            });
        });
    };

})(jQuery);