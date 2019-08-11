# BulSlider
My own slider-plugin created with JavaScript and using almost on all my websites.

# Welcome to the BulSlider!

To start working with slider you need to copy the main markup from index.php and include slider.js and slider.css in your project. You need to place your slides in slider-viewport and set them class "slide". Slide can be any markup: images, text, graphics, another slider etc. So the starting markup will be simillar to that:

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Slider</title>
	<link rel="stylesheet" href="css/slider.css">
</head>
<body>
	<div class="slider">
		<div class="slider-viewport-wrapper">
			<div class="slider-viewport">
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
			</div>
		</div>
	</div>
	<script
	src="https://code.jquery.com/jquery-3.4.1.min.js"
	integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>
	<script src="js/slider.js"></script>
        <script src="js/main.js"></script>
</body>
</html>
```

To initialize your slider you need to create a new variable in your js script and set "new Slider(*your slider (html object)*)" as its value, for example:

`let slider = new Slider(document.querySelector('.slider'));`

***
## Options
You can change the slider by setting options object as its second parameter. For example you need to show 3 slides and change 1 slide. In that case options object will be like that:

`let slider = new Slider(document.querySelector('.slider'), {
		slidesToShow: 3,
		slidesToChange: 1,
	});` 

Options object can get these paremeters:
1. slidesToShow (number) - the amount of slides to show (default value: 1).
2. slidesToChange (number) - the amount of slides to change (default value: 1).
3. dots (boolean) - to show the dots or not (default value: true).
4. animate (boolean) - if you want to automatically change your slides you need to set that parameter to true (default value: false).
5. animationDelay (number) - if you set the animate parameter to true you can change the delay between each change (set the value in the seconds, default value: 1).
6. arrows (boolean) - to show the arrows or not (default value: true);

***

## Reinitialize

If you dinamically change the content of slider (for examle: filter slides with category), you need to reinitialize your slider that will update the number of dots and reset current slider-viewport position. It would be like that:

```
	$(document).click(function(){ // or any other event
		$('.slide').eq(1).remove(); // change the content
		$('.slide').eq(2).remove();
		slider.dotsPrint(); // reinitialize slider
	});
```

***

## Final result

So your final result would be like that:

### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Slider</title>
	<link rel="stylesheet" href="css/slider.css">
</head>
<body>
	<div class="slider">
		<div class="slider-viewport-wrapper">
			<div class="slider-viewport">
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
				<div class="slide">
					<img src="sertificate.png" alt="sertificate">
				</div>
			</div>
		</div>
	</div>
	<script
	src="https://code.jquery.com/jquery-3.4.1.min.js"
	integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>
	<script src="js/slider.js"></script>
        <script src="js/main.js"></script>
</body>
</html>
```

### JS
```
$(document).ready(function(){
	let slider = new Slider(document.querySelector('.slider'), {
		slidesToShow: 3,
		slidesToChange: 1,
		dots: true,
		animate: true,
		animationDelay: 3,
		arrows: true
	});
});
```



