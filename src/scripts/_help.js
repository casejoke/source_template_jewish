var help = {
	init:function(){
		help.datepickerInit();
	},
	datepickerInit:function(){
		/*
		* Date Time Picker
		*/
		//Date
		if ($('.date-picker')[0]) {
			$('.date-picker').datetimepicker({
			    format: 'YYYY-MM-DD',
			    icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down",
		            previous: 'fa fa-arrow-left',
		            next: 'fa fa-arrow-right',
		            today: 'fa fa-coffee',
		            clear: 'fa fa-trash-o'

                }
			});
		}

	}
};