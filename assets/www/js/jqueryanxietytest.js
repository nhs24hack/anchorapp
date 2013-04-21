var pos = 0;
var neg = 1;

var currentQuestion = 1;

var questions = Array (10);
var scales = Array(10);

questions [0] = "I have felt tense, anxious or nervous";
scales [0] = neg;

questions [1] = "I have felt able to cope when things go wrong";
scales [1] = pos;

questions [2] = "I have felt panic or terror";
scales [2] = neg;

questions [3] = "I have had difficulty getting to sleep or staying asleep";
scales [3] = neg;

questions [4] = "I have felt unhappy";
scales [4] = neg;

questions [5] = "I have felt I have someone to turn to for support when needed";
scales [5] = pos;

questions [6] = "Talking to people has felt too much for me";
scales [6] = neg;

questions [7] = "I made plans to end my life";
scales [7] = neg;

questions [8] = "I have felt despairing or hopeless";
scales [8]= neg;

questions [9] = "Unwanted images or memories have been distressing me";
scales [9] = neg;

var answers = Array (10);

$("document").ready(function() {
	$("#question").text(currentQuestion + ". " + questions[currentQuestion -1]);
	if (scales[currentQuestion -1] == pos) {
			$("#pos").show();
			$("#neg").hide();
		} else {
			$("#neg").show();	
			$("#pos").hide();
		}
});

function nextQuestion() {
	var selectedVal = "";
	var selected = $("input[type='radio'][name='QuestionOneRadio']:checked");
	if (selected.length > 0) {
		answers[currentQuestion -1] = parseInt(selected.val(), 10);
	} else {
		answers[currentQuestion -1] = 0;
	}
	
    $("input[type='radio'][name='QuestionOneRadio']").removeAttr("checked");

	if (currentQuestion < questions.length) {
		currentQuestion ++;
		$("#question").text(currentQuestion + ". " + questions[currentQuestion -1]);
		if (scales[currentQuestion -1] == pos) {
			$("#pos").show();
			$("#neg").hide();
		} else {
			$("#neg").show();	
			$("#pos").hide();
		}
		return false;
	} else {

		currentQuestion = 1;
		
		var avg = 0;
		for(var a = 0; a < answers.length; a++) {
				avg = avg + answers[a];
		}
		avg = Math.round(avg / answers.length);

        var result;


		


		switch (avg) {
		  case 0:
		    result = "Your scores indicate that your level of anxiety is typical of those without an anxiety disorder.</p>";
		    break;
		  case 1:
		    result = "<p>Your scores indicate that your anxiety is low at the moment.</p><p>Project Ginsberg offers a place of support open to all. Join a forum, ask questions or contact one of the services here.</p>";
		    break;
		  case 2:
		    result="<p>Your scores indicate that your anxiety is moderate at the moment.</p><p>Project Ginsberg offers a place of support open to all. Join a forum, ask questions or contact one of the services here.</p>";
		    break;
		  case 3:
		    result="<p>Your scores indicate that your anxiety is high at the moment.</p><h4>Would you like support?</h4><p>Yes</p><p>No</p><p>Project Ginsberg offers a place of support open to all. Join a forum, ask questions or contact one of the services here.</p>";
		    break;
		  case 4:
		    result="<h4>Your answers suggest you need immediate support<h4><p>Please contact one of the following services;</p><p>Emergency 999</p><p>Samaritans 08457 90 90 90</p><p>Breathing Space - 0800 83 85 87</p><p>Your GP or NHS 24</p><p>I'm not that anxious</p>";
		    break;
		}
		

        $("#Score").html(result);

        $("#Questions").addClass("hidden");
        $("#Result").removeClass("hidden");
		
		return false;
	}
}


