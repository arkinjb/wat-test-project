# The Namegame

Leading scientists have proven, via science, that learning your coworkers names while starting a new job is useful. Your test project is to make it happen! We have a simple version hosted at [namegame.willowtreemobile.com](http://namegame.willowtreemobile.com/) which you can test. The api is located at [http://api.namegame.willowtreemobile.com/](http://api.namegame.willowtreemobile.com/).

## Handlebars

I noticed your version used lodash but I have not used that (or underscore) before. I did use Handlebars a couple of times during bootcamp, so I figured I would use that for my templating. It took a little while to refresh my memory, but I think it worked well.

## Issue with random number function

In order to determine the employee name used in the question, I generated a random number which I used to pull a name from the array by index. I was having an issue in my earlier code with the question not populating. I thought it was an issue with the template being built before the number was generated. I spent quite a while trying to work with my functions and callbacks because I thought that the issue was caused by the asynchronous nature of the javascript functions.

I figured out a work-around by generating the number immediately (before the ajax call). It wasn't until I was in the process of typing up this explanation that I realized what the issue actually was. In my earlier code, I forgot to subtract 1 from the array length in the random number generator, so 20% of the time, the random number (5) wasn't an index in the employee array. My work-around had the correct code for the generator, which is the real reason it worked.

## Options

I added the guess counters and a difficulty option. I also wanted to add a "Matt" level of difficulty, but could not figure out how to filter the Matts out of the array from the ajax call. I tried to filter it using indexOf to determine if the full name included the substring Matt, but could not get it to function correctly.

## Style

Because I spent so much time with the above issue, I didn't work on the styling of the employee section and the options as I much as I would have liked.

## Option 1

Present the user with five faces and ask them to identify the listed name. This is essentially what is working already. To spruce things up, implement a few features of your choice.

1. Stat tracking. How many correct / incorrect attempts did the user make? How long does it take on average for a person to identify the subject?
2. Reverse mode, Show five names with one picture.
3. Keyboard shortcuts. Power users love keyboard shortcuts, maybe add numbers for faces for mouse free fun. Bonus points for Vim shortcuts. Negative points for Emacs**.
4. Local Scoring. The server might not accept scores, but you can always track it locally. Make metrics of your own and have a leader board!
5. Mat(t) Mode. Roughly 90% of our co-workers are named Mat(t), so add a challenge mode where you only present the users with A Mat(t).
6. Hint mode. As people wait, faces disappear until only the correct one is left.
7. Insert your own idea here!


## Option 2

Feel like taking the path less trodden? Do you know a better way to learn faces than to present five options and a name? Come up with your own memory game!

## Conclusion

We have provided you with a few files to get you started. Feel free to discard everything and start from scratch. You may use any framework or library you like.

If you need a simple http server, we recommend [http-server](https://www.npmjs.org/package/http-server).

** The Web Apps Team Lead uses Emacs. So, like, use your own discretion here.
