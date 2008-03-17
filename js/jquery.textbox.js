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
            var $this = $(this);
            
            var wrapper = $("<div class='textbox' />");
            $this.wrap(wrapper);
                
            var root = $(".textbox");
            root.width(this.offsetWidth);
            
            var arrow = $("<div class='arrow' />").prependTo(root);
            arrow.css("top",(($this.offset().top + (this.offsetHeight / 2)) - 8) + "px");
            arrow.css("left",(($this.offset().left + this.offsetWidth) - 16) + "px");
            
            var list = $("<ul />").appendTo(root);
            list.width(this.offsetWidth);
            list.css("top",($this.offset().top + this.offsetHeight) + "px");
            
            list.mousedown(function(e)
            {
                list.toggle();
                $this.val($(e.target).text());
                
                if(typeof o.onSelect == "function")
                   o.onSelect($(e.target).text());
            });
            
            $.each(o.items,function(i)
            {
                $.fn.textbox.add(root,this);
            });
            
            arrow.mousedown(function()
            {
                list.toggle();
            });
            
            $this.click(function()
            {
                this.select();
            })
            
            $this.focus(function()
            {
                var val = $(this).val();
                this.select();
                
                $(this).bind('blur',function()
                {
                    $(this).unbind("blur");
                    $(this).unbind("keyup");
                    
                    if(typeof o.onChange == "function"
                       && $(this).val() != val
                       && $(this).val() != "")
                    {
                        o.onChange($(this).val());
                    }
                });
                
                $this.bind('keyup',function(e)
                {
                    if(e.keyCode == 13)
                    {
                        $(this).unbind("keyup");
                        $(this).blur();
                    }
                });
            });         
        });
    };

    // This works except I cant get access to
    // the default options 'o'
    $.fn.textbox.add = function(root,item)
    {
        var ulist = root.find("ul");
        var anchor = $("<a>"+item+"</a>");
            
        ulist.append($("<li />").append(anchor));
    };

})(jQuery);