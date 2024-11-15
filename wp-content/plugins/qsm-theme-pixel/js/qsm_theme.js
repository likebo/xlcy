start_quiz = 0;
jQuery(document).ready(function () {
    jQuery('.quiz_theme_qsm-theme-pixel').each(function () {
        var quiz_id = jQuery(this).find('.qmn_quiz_id').val();
        var qsm_theme_pixel_object_id = eval('qsm_theme_pixel_object_' + quiz_id);
        //Featured image js start
        no_featured_image = false;
        if (typeof qsm_theme_pixel_object_id.featured_image !== 'undefined' && qsm_theme_pixel_object_id.featured_image.trim().length > 0 && (!qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') || 1 != qmn_quiz_data[quiz_id].disable_first_page)) {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' #quizForm' + quiz_id).prepend("<div class='pixel-featured-image-container'><img class='qsm-pixel-featured-image' src='" + qsm_theme_pixel_object_id.featured_image + "'></div>");
        } else {
            no_featured_image = true;
        }
        if (jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).find('.qsm-page-1').length || jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).find('.qsm-auto-page-row').length) {
            if (!no_featured_image) {
                if (!jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).hasClass('qsm_random_quiz')) {
                    jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).addClass('pixel-feature-image-added');
                    jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + '.qsm_auto_pagination_enabled').addClass('has-featured-image');
                }
            }
        }
        //Featured image js end
        //quiz header js start
        header = "<div class='qsm-theme-pixel-header'>" +
                    "<div class='qsm-pixel-pagination-timer'>";
                    if ( ( qmn_quiz_data[quiz_id].hasOwnProperty('pagination') && 0 != qmn_quiz_data[quiz_id].pagination.amount ) || ( qmn_quiz_data[quiz_id].hasOwnProperty('qpages') && 1 < Object.keys(qmn_quiz_data[quiz_id].qpages).length ) ) {
                        header += "<div class='qsm-pixel-pagination'>" +
                                    "<span class='pixel-previous-btn qsm-pixel-top-btn dashicons dashicons-arrow-left-alt' quiz-id='" + quiz_id + "' style='display:none'>" +
                                    "</span>";
                                    //page count start
                                    if (0 < jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pages_count').length) {
                                        var total_page = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-page').length;
                                        if ( qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') && 1 == qmn_quiz_data[quiz_id].disable_first_page) {
                                            header += "<span class='pixel-pagination-text'><span class='pixel-page-title'>" + qsm_theme_pixel_object.pages + "</span> <span class='pixel-page-current'>1</span> / <span class='pixel-page-total'>" + total_page + "</span></span>";
                                        } else {
                                            total_page = total_page - 1;
                                            header += "<span class='pixel-pagination-text'><span class='pixel-page-title'>" + qsm_theme_pixel_object.pages + "</span> <span class='pixel-page-current'>0</span> / <span class='pixel-page-total'>" + total_page + "</span></span>";
                                        }
                                    }
                                    //page count end
                        header += "<span class='pixel-next-btn qsm-pixel-top-btn dashicons dashicons-arrow-right-alt' quiz-id='" + quiz_id + "'>" +
                                "</span>" +
                                "</div>";
                    }
                    if (qmn_quiz_data[quiz_id].hasOwnProperty('timer_limit_val') && qmn_quiz_data[quiz_id].timer_limit_val > 0) {
                            header += "<span class='pixel-timer'>" +
                                "<span class='pixel-timer-value'></span>" +
                                "<span class='pixel-timer-label'></span>" +
                                "</span>";
                    }

        header += "</div><div class='pixel-progress-bar'><div class='progress-container'><div class='progress'></div><div class='percentage'></div></div></div>";
        header += "</div>";
        jQuery('#quizForm' + quiz_id).prepend(header);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar').appendTo('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar');
        if (!jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar .qsm-pixel-progressbar-icon').length) {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar').prepend('<span class="qsm-pixel-progressbar-icon dashicons dashicons-arrow-down"></span>');
        }
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar').hide();
        if (0 < jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .total_pages_hidden').length) {
            var total_page = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .total_pages_hidden').val();
            if (qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') && 1 == qmn_quiz_data[quiz_id].disable_first_page && jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .empty_quiz_end').length) {
                total_page = total_page - 2;
            }else if ( ( qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') && 1 == qmn_quiz_data[quiz_id].disable_first_page ) || jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .quiz_end:not(.empty_quiz_end)').length ) {
                total_page = total_page - 1;
            } else {
                total_page = total_page - 2;
            }
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-total').html(total_page);

        }
        //quiz header js end
        if ( jQuery('.quiz_theme_qsm-theme-pixel .quiz_begin:visible') ) {
            jQuery('.quiz_theme_qsm-theme-pixel .qsm-pixel-pagination').hide();
        }
    });

    //Polar question type js start
    jQuery('.quiz_theme_qsm-theme-pixel .question-type-polar-s').each(function () {
        sliderWrapper = jQuery(this).find('.slider-main-wrapper');
        sliderWrapper.find('.ui-slider-handle').html("<span class='dashicons dashicons-arrow-left-alt2'></span><span class='ui-slider-button'></span><span class='dashicons dashicons-arrow-right-alt2'></span>");
        sliderWrapper1 = sliderWrapper;
        jQuery(sliderWrapper1).insertAfter(sliderWrapper.next());
    });
    //Polar question type js end

    // File Upload start
    jQuery('.quiz_theme_qsm-theme-pixel .mlw_answer_file_upload').each(function () {
        fileUpload = '<div class="pixel-file-upload-container">' +
            '<span class="dashicons dashicons-cloud-upload pixel-file-upload-logo"></span>' +
            '<div class="pixel-file-upload-message">' + qsm_theme_pixel_object.file_upload_text +
            '</div>' +
            '<div class="pixel-file-upload-name"></div>' +
            '<div style="display:none" class="pixel-file-upload-error pixel-file-uploading">' + qsm_theme_pixel_object.uploading + '</div>' +
            '</div>' +
            '</div>';
        jQuery(fileUpload).insertAfter(jQuery(this));
    });

    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on('click', function (e) {
        e.preventDefault();
        jQuery(this).prev('.mlw_answer_file_upload').trigger('click');
    });

    jQuery('.mlw_answer_file_upload').on('change', function () {
        jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-name').html(jQuery(this)[0].files[0].name);
        let h = jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-name').outerWidth();
        jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-name').css('left', 'calc(50% - ' + Math.round(h/2) + 'px)');
        jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-error').removeClass('pixel-file-upload-error-msg');
        jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-error').removeClass('pixel-file-upload-success-msg');
        jQuery(this).next('.pixel-file-upload-container').find('.pixel-file-upload-error').addClass('pixel-file-uploading').html(qsm_theme_pixel_object.uploading).show();
    });

    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on(
        'dragover',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).addClass('file-hover');
        }
    )
    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on(
        'dragenter',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    )
    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on(
        'dragleave',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).removeClass('file-hover');
        }
    )
    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on(
        'drop',
        function (e) {
            jQuery(this).removeClass('file-hover');
            jQuery(this).find('.pixel-file-upload-name').html(e.originalEvent.dataTransfer.files[0].name).fadeIn();
            if (e.originalEvent.dataTransfer) {
                if (e.originalEvent.dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    jQuery(this).prev('.mlw_answer_file_upload').prop('files', e.originalEvent.dataTransfer.files);
                    jQuery(this).prev('.mlw_answer_file_upload').trigger('change');
                }
            }
        }
    );
    jQuery('.quiz_theme_qsm-theme-pixel .pixel-file-upload-container').on('mouseleave', function () {
        jQuery(this).removeClass('file-hover');
    });
    jQuery(document).on('qsm_after_file_upload', function (e, container, response) {
        container.find('.mlw_file_upload_hidden_value').val(response.file_url);
        if ('error' == response.type) {
            container.find('.mlw_file_upload_media_id').val('');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-uploading');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-upload-success-msg');
            container.find('.pixel-file-upload-error').addClass('pixel-file-upload-error-msg').html(response.message).fadeIn();
        } else {
            container.find('.pixel-file-upload-error').removeClass('pixel-file-upload-error-msg');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-uploading');
            container.find('.pixel-file-upload-error').addClass('pixel-file-upload-success-msg').html(response.message).fadeIn();
        }
        let h = container.find('.pixel-file-upload-name').outerWidth();
        container.find('.remove-uploaded-file').css('left', 'calc(51% + ' + Math.round(h/2) + 'px)');
        container.find('.remove-uploaded-file').addClass('dashicons-trash');
    })
    // File Upload end
    jQuery(document).on('click ', '.quiz_theme_qsm-theme-pixel .quiz_section .remove-uploaded-file', function () {
        jQuery(this).parents('.quiz_section').find('.pixel-file-upload-error').removeClass('pixel-file-upload-success-msg');
        jQuery(this).parents('.quiz_section').find('.pixel-file-upload-error').addClass('pixel-file-uploading').html(qsm_theme_pixel_object.removing).show();
    })
    jQuery(document).on('qsm_after_file_remove', function(e, container, response) {
        if ('error' == response.type) {
            container.find('.mlw_file_upload_media_id').val('');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-uploading');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-upload-success-msg');
            container.find('.pixel-file-upload-error').addClass('pixel-file-upload-error-msg').html(response.message).fadeIn();
        } else {
            container.find('.pixel-file-upload-error').removeClass('pixel-file-upload-error-msg');
            container.find('.pixel-file-upload-name').html('');
            container.find('.pixel-file-upload-error').removeClass('pixel-file-uploading');
            container.find('.pixel-file-upload-error').addClass('pixel-file-upload-success-msg').html(response.message).fadeIn();
        }
    })
});

//hook for after progress bar
jQuery(document).on('qsm_init_progressbar_after', function (e, quiz_id, qmn_quiz_data) {
    jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar').appendTo('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar');
    if (!jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar .qsm-pixel-progressbar-icon').length) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-progress-bar').prepend('<span class="qsm-pixel-progressbar-icon dashicons dashicons-arrow-down"></span>');
    }
});

//page count start
jQuery(document).on('qsm_init_pagination_after', function (e, quiz_id, qmn_quiz_data) {
    if (0 < jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .total_pages_hidden').length) {
        var total_page = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .total_pages_hidden').val();
        if (qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') && 1 == qmn_quiz_data[quiz_id].disable_first_page && jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .empty_quiz_end').length) {
            total_page = total_page - 2;
        }else if ( ( qmn_quiz_data[quiz_id].hasOwnProperty('disable_first_page') && 1 == qmn_quiz_data[quiz_id].disable_first_page ) || jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .quiz_end:not(.empty_quiz_end)').length ) {
            total_page = total_page - 1;
        } else {
            total_page = total_page - 2;
        }
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-total').html(total_page);
    }
});
//page count end

//hook after click next and previous button
jQuery(document).on('qsm_next_button_click_after qsm_previous_button_click_after', function (event, quiz_id) {
    //Featured image js start
    if (jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .mlw_previous').css("display") == "none") {
        if (!no_featured_image) {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-featured-image-container').show();
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).addClass('pixel-feature-image-added');
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).addClass('has-featured-image');
        }
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-pixel-pagination').fadeOut(500);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar').fadeOut(500);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-previous-btn').hide();
    } else {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).removeClass('pixel-feature-image-added');
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id).removeClass('has-featured-image');
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-featured-image-container').hide();
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar').fadeIn(500).css({
            'display': 'flex'
        });
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-pixel-pagination').fadeIn(500);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-progress-bar').fadeIn(500);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-previous-btn').show();
    }
    if (jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .mlw_next').is(':visible')) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-next-btn').show();
    } else {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-next-btn').hide();
    }
    //Featured image js end

    //Pagination js start
    if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
        title = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pages_count').html();
        if (undefined !== title) {
            jQuery('.quiz_theme_qsm-theme-pixel .qsm-pixel-pagination').show();
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page').html(title);
        } else {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page').html('');
        }
    } else {
        title = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qsm-page:visible .pages_count').html();
        if (undefined !== title) {
            jQuery('.quiz_theme_qsm-theme-pixel .qsm-pixel-pagination').show();
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page').html(title);
        } else {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page').html('');
        }
    }
    //Pagination js end

    //page count start
    if (0 < jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-current').length) {
        var current_page = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-current').html();
        if ('qsm_next_button_click_after' === event.type) {
            if (!jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .qmn_error_message').length) {
                jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-current').html(parseInt(current_page) + +1);
            }
        } else {
            jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-page-current').html(parseInt(current_page) - 1);
        }
    }
    if ( qmn_quiz_data[quiz_id].progress_bar == 0 ) {
        jQuery('.quiz_theme_qsm-theme-pixel .qsm-theme-pixel-header .pixel-progress-bar .progress-container').hide();
    }
    if (jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .progressbar-text').length) {
        var targetNodes = jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .progressbar-text');
        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    var width = jQuery(mutation.target).text();
                    width = width.replace(/\s/g, '');
                    setPercentage(width);
                }
            }
        };
        var observer = new MutationObserver(callback);
        var config = { characterData: true, childList: true, subtree: true };
        targetNodes.each(function() {
            observer.observe(this, config);
        });
    }
    //page count end
});
function setPercentage( percentage ) {  
    const progressContainer = document.querySelector('.progress-container');
    const progressEl = progressContainer.querySelector('.progress');
    const percentageEl = progressContainer.querySelector('.percentage');

    progressEl.style.width = percentage;
    // percentageEl.innerText = percentage;
    percentageEl.style.left = percentage;
}
jQuery(document).on('click', '.quiz_theme_qsm-theme-pixel .pixel-previous-btn', function (e) {
    var quiz_id = jQuery(this).attr('quiz-id');
    jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .mlw_previous').trigger('click');
});
jQuery(document).on('click', '.quiz_theme_qsm-theme-pixel .pixel-next-btn', function (e) {
    var quiz_id = jQuery(this).attr('quiz-id');
    jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .mlw_next:not(.mlw_custom_start)').trigger('click');
});

//hook after timer init
jQuery(document).on('qsm_activate_time_after', function (e, quiz_id) {
    var timerStarted = localStorage.getItem('mlw_started_quiz' + quiz_id);
    var timerRemaning = localStorage.getItem('mlw_time_quiz' + quiz_id);
    if ('yes' == timerStarted && 0 < timerRemaning) {
        seconds = parseInt(timerRemaning);
    } else {
        seconds = parseFloat(qmn_quiz_data[quiz_id].timer_limit) * 60;
    }

    if (0 == seconds || isNaN(seconds)) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer').hide();
    } else {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer').show();
    }
    if (0 == start_quiz && qmn_quiz_data[quiz_id].hasOwnProperty('timer_limit') && 0 < qmn_quiz_data[quiz_id].timer_limit) {
        startTimer(quiz_id, seconds);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer .pixel-timer-label').html(qsm_theme_pixel_object.time_left);
    }
});

function startTimer(quiz_id, seconds) {
    var qsm_theme_pixel_object = eval('qsm_theme_pixel_object_' + quiz_id);
    var selectedTimeFormat = qsm_theme_pixel_object.time_format;
    timerInterval = setInterval(() => {
        seconds--;
        var time_label = '';
        var hours, minutes, sec;

        if (selectedTimeFormat == 0) {
            // HH:MM format
            hours = Math.floor(seconds / 3600);
            minutes = Math.floor((seconds % 3600) / 60);
            time_label = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
        } else if (selectedTimeFormat == 1) {
            // MM:SS format
            minutes = Math.floor(seconds / 60);
            sec = seconds % 60;
            time_label = minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
        } else if (selectedTimeFormat == 2) {
            // HH:MM:SS format
            hours = Math.floor(seconds / 3600);
            minutes = Math.floor((seconds % 3600) / 60);
            sec = seconds % 60;
            time_label = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
        } else {
            // Default to HH:MM format
            hours = Math.floor(seconds / 3600);
            minutes = Math.floor((seconds % 3600) / 60);
            time_label = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
        }

        if (0 == minutes) {
            changeColor(quiz_id, seconds);
        }

        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer-value').html(time_label);
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer .pixel-timer-label').html(qsm_theme_pixel_object.time_left);

        if (1 > seconds) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function changeColor(quiz_id, time) {
    if (time > 30 && time <= 45) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer-value').css('color', '#229ACD');
    } else if (time > 15 && time <= 30) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer-value').css('color', '#FFB800');
    } else if (time <= 15) {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer-value').css('color', '#FF5555');
    } else {
        jQuery('.quiz_theme_qsm-theme-pixel.qsm-quiz-container-' + quiz_id + ' .pixel-timer-value').css('color', '#1DD969');
    }
}

//hook after timer init end
