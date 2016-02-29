var objects = [];
angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height, padding',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;
            var holder = {
                          element: element,
                          attrs: attrs
                      };
                      objects.push(holder);
            attrs.expanded = false;

            element.bind('click', function() {
              for(var i = 0; i < objects.length; i ++) {
                    if (objects[i].element != element && objects[i].attrs.expanded) {
                        // Because the click does not fire...
                        // objects[i].element[0].click();
                        var ptarget = document.querySelector(objects[i].attrs.slideToggle);
                        var pcontent = ptarget.querySelector('.slideable_content');

                        if(!objects[i].attrs.expanded) {
                          //  ptarget.style.height = '16px';
                            pcontent.style.border = '1px solid rgba(0,0,0,0)';
                            var y = pcontent.clientHeight;
                            pcontent.style.border = 0;
                            ptarget.style.height = y + 'px';
                        } else {
                            ptarget.style.height = '0px';
                          //  ptarget.style.padding = '0px 16px';
                        }
                        objects[i].attrs.expanded = !objects[i].attrs.expanded;
                    }
                }
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');

                if(!attrs.expanded) {
                //    target.style.padding = '16px';
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight ;
                    content.style.border = 0;
                    target.style.height = y + 'px';

                } else {
                    target.style.height = '0px';
              //      target.style.padding = '0px 16px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});
