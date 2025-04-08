(function($) {
    "use strict";

	// Counter Up  
    $('.rs-counter').counterUp({
        delay: 22,
        time: 2000
    });

    // Sidebar Service Toggle class for content show hide 
    if ($('.sidebar-content-trigger-btn').length) {
        $('.sidebar-content-trigger-btn').on('click', function () {
            const $service = $(this).closest('.sidebar-single-service');
            const $desc = $service.find('.the-desc');
    
            $service.toggleClass('active');
    
            if ($service.hasClass('active')) {
                const descHeight = $desc.outerHeight() + 20;
                $service.css('margin-bottom', `${descHeight}px`);
            } else {
                $service.css('margin-bottom', '');
            }
        });
    }
    

})(jQuery); 