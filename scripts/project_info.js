//TODO: create a little tab at the bottom.
//TODO: inject our template into the HTML

(function() {

    //TODO: test if url is my personal page in the script that loads all this.

    var dependencies = [
         /*{ready : function() {return typeof angular !== "undefined" && angular.version.major === 1;}, url : "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"},*/
                         {ready : function() {return typeof $ !== "undefined";}, url : "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"}];

    function check_requirements() {
        for(var i = 0; i < dependencies.length; i++) {
            if(!dependencies[i].ready()){
                return;
            }
        }

        inject_element();
    }

    //From High Performance Javascript
    function load_script(url, callback) {
        var script = document.createElement("script");

        if(script.readyState) {
            script.onreadystatechange = function() {
                if(script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() {
                callback();
            };
        }
        script.async = 'async';
        script.src = url;
        document.head.appendChild(script);
    }

    for(var i = 0; i < dependencies.length; i++) {
        if(!dependencies[i].ready()) {
            load_script(dependencies[i].url, check_requirements);
        }
    }

    check_requirements();

    var style =  document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = "/assets/style/projects.css";
    document.head.appendChild(style);

    function toggle_info(e) {
        $(".project-info article").toggle();
        $(this).text($(this).text() == "+" ? "-" : "+");
    }

    function inject_element() {
        $.getJSON("metadata.json", function(data) {
            var $button = $("<div>").addClass("project-info-button").text("+").click(toggle_info);

            var $project_info = $("<div>").addClass("project-info");
            var $project_title = $("<header>").text(data.title);
            var $project_article = $("<article>").append($project_title).append(data.summary).hide();

            $project_info.append($button).append($project_article);
            $("body").append($project_info);

            //TODO: see more projects like this button
        });
    }
})();
