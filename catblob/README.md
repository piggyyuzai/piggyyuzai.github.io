# Project 1: Cat Blob


<br/>

## Index
* [Overview](./README.md#overview)
* [Brief](./README.md#brief)
* [Technologies Used](./README.md#technologies-used)
* [Approach](./README.md#approach)
	* [Navigation Using Grids](./README.md#navigation-using-grids)
	* [Using Additional Layers](./README.md#using-additional-layers)
	* [Sprite Animation](./README.md#sprite-animation)
	* [Items](./README.md#items)
	* [Creating the Maze](./README.md#creating-the-maze)
	* [Dog Blob’s Movement](./README.md#dog-blobs-movement)
	* [Dog Blob’s Personality](./README.md#dog-blobs-personality)
* [Final Thoughts](./README.md#final-thoughts)
	* [Wins and Challenges](./README.md#wins-and-challenges)
	* [Key Learnings](./README.md#key-learnings)

<br />
<br />

Click [here](http://www.ma5a.com/catblob/) to see project.


<br/>

## Overview 
At General Assembly's Software Engineering course, we were given the challenge to make a game in one week using HTML, CSS and Javascript. We were given couple of games to choose from, so I decided to base my game on Pac-Man. 

In case you are not familiar with the 80s arcade classic, the game involves navigating a maze to eat all the food, while running away from colourful ghosts. When Pac-Man eats an Energizer, he can eat the ghosts too - when this happens, the ghost runs away from Pac-Man instead.

We were allowed to use premade assets for this project, but I really wanted to make my own to showcase my illustration. Since I didn’t have much time, I designed a simple character called Cat Blob to be my Pac-Man, and Dog Blobs to replace the ghosts (I don’t really have a back story for them, but I imagine them to be aliens resembling cats and dogs. Cat Blob’s mission is collect all the stars in the cave, guarded by the Dog Blobs).

<br/>

## Brief
* To make a game based on Pac-Man, where the player is able to clear at least one board.
* The player's score should be displayed at the end of the game.

<br/>

## Technologies Used
* HTML5 with HTML5 audio
* CSS3 with animation
* JavaScript (ES6)
* Git
* GitHub
* Google Fonts
* Google Chrome dev tools
* VS Code
* Eslint
* Photoshop
* Procreate
* Illustrator
* Google Sheets
* Garage Band

<br/>

## Approach

### Navigation Using Grids
Starting point was to use grids to enable player to move around the map. Grids were made from square divs mapped into a wrapper. Player and ghosts are positioned on the grid by adding a background image using a class. By using `EventListener` triggered by ‘keyup’, the player is able to move up, down, left or right by pressing the corresponding arrow keys on the keyboard. For example if up key is pressed, class is removed from a div and added to a div above the original div. This creates the illusion of the characters moving. To ensure the player (and ghosts) remains on the grid, logic was added to restrict the movement if the div in the moving direction contained a class called ‘wall’. Same logic was used to create the maze.

There are pros and cons for this approach:

#### Pros 
* As described above, easy to create logic for navigating the maze.
* Easy to create logic for ‘collision’ (player loses life if it ends up in the same div as the ghost, and player can take item when it enters certain divs).

#### Cons
* When characters move, it appears to ‘jump’ from div to div (ie animation becomes jittery).

<p align="center">
	  <img src="README_images/game_play.gif" alt=“diagram1” style="border-radius:8px" />
</p>

<br/>

### Using Additional layers
To overcome the issue described earlier, I decided to place a transparent div which covered the whole page, which contained divs that were positioned based on the character movement in the grid. Here’s a diagram to explain this approach:

<p align="center">
	  <img src="README_images/fig1.png" alt="diagram2" style="border-radius:8px" />
</p>

* Div with character image is positioned based on the grid underneath it. Using the movement logic explained earlier, character class is removed from the original div, and added to the div next to it. 
* Once character’s new position is determined, the character image div is repositioned. 
* The character image div has `transition` set in the css, which means the movement between the grids are fully animated.

<p align="center">
	  <img src="README_images/fig2.png" alt="diagram3" style="border-radius:8px" />
</p>

As a result, the animation became smoother:

<p align="center">
	  <img src="README_images/gameplay_2.gif" alt="diagram4" style="border-radius:8px" />
</p>

However, this technique had a strange side effect where the character position became misaligned with the actual position when browser windows were resized. This happened because the character image was positioned using `.getBoundingClientRect()` on the div, meaning that the position was relative to the browser window.

<p align="center">
	  <img src="README_images/screen_size.gif" alt="diagram5" style="border-radius:8px" />
</p>

To fix this issue, function below was called every second using `setInterval`. It checked the position of each ‘actors’ (both Cat Blob and Dog Blob) and made sure the images lined up with their corresponding grid. I eventually made the grid responsive, so I made sure the image heights matched the grid as well. In retrospect, I think I could have called this function by using `EventListener` triggered by window resize, but `setInterval` worked fine since you wouldn’t resize the window too often during game play.

``` js
  function reAdjustActorSize(actor){
    const cellSize = cells[0].getBoundingClientRect()
    actor.display.style.height = `${cellSize.height}px`
    actor.display.style.width = `${cellSize.width}px`
  }
```

<p align="center">
	  <img src="README_images/screen_size_2.gif" alt="diagram6" style="border-radius:8px" />
</p>

Further codes were added for the Dog Blobs, to make sure the images’ transition kept up with the position changing. By default the transition was 0.3 seconds, but sometimes the Dog Blobs moved faster, so transition was adjusted to keep everything in sync.

```js
  if (actor !== player) {  
  //* syncing actor’s speed with it’s speed (only for Dog Blobs)
      actor.display.style.transition = `${actor.speed / 1000}s`
    }
  if (actor !== player && actor.speed >= 300) { 
  //* ensure transition is at least 0.3, however slow the Dog Blob
    actor.display.style.transition = ‘0.3s’ 
  }
```
<br/>

### Sprite Animation
There are further techniques used for animating the sprites:

* Character image used a looped gif (rough created in Procreate, final version created with Illustrator and Photoshop).
* Character image ‘turns’ based on the direction key pressed.
	* The function for turning the character will work even if there is a wall in the destination (ie, character can face different direction whilst staying in the same position). 
	* This was important because some of the ghost’s logic relied on knowing which way the player was facing.

<p align="center">
	  <img src="README_images/sprites.gif" alt="diagram7" style="border-radius:8px" />
</p>

* When Cat Blob moved left or right, the image momentarily changed to gifs below before moving to the new position, adding further variation to the movement.

<p align="center">
	  <img src="README_images/sprites2.gif" alt="diagram8"  style="border-radius:8px" />
</p>

When the Cat Blob becomes ‘invincible’, following css class with keyframe animation is added.  Brightness and hue of the gif was animated to make it look like it was sparkling, effect similar to when Super Mario becomes invincible (the gif itself was changed to a pink image to take advantage of the hue-rotate, since it would not work well on a white image).
```css
.invincible {
  animation: invincible 2s infinite;
}

@keyframes invincible {
  0% {filter: hue-rotate(0deg) brightness(100%);}
  50% {filter: hue-rotate(100deg) brightness(500%);}
  100% {filter: hue-rotate(230deg) brightness(100%);}
}
```

<p align="center">
	  <img src="README_images/invincible.gif" alt="diagram8"  style="border-radius:8px" />
</p>

</br>

### Items
There are three items in the game - ‘normal star’, ‘blue star’ and ‘big star’. The game is completed by collecting all stars in the maze. There were number of functions tailored for these items:

#### Item Effect
When Cat Blob enters a div with an item, function is called looping through an array of objects. Each object contains information such as how much points player will earn, and the sound effect triggered when item is taken.

#### Item Animation
Each items are rendered by adding background image to a div.  When item is taken,  function is triggered for animation effect - the star flies from its position to where the scoreboard is, visualising that score is earned through these items (if you have ever played Donkey Kong, it’s similar to how the banana is animated each time player collects them).

<p align="center">
	  <img src="README_images/score.gif" alt="diagram9" style="border-radius:8px" />
</p>

This animation is achieved by first removing the item gif from the grid, then immediately creating a new div containing the item gif in the same place. After the div is created, position is reassigned to where the scoreboard is. This div also has CSS transition, so it appears to fly from one position to another. When the item reaches the scoreboard, a class is added to the scoreboard to enlarge it. Everything is timed by using `setTimeout`.

```js
 const currentPlayerPosition = outerCells[player.position].getBoundingClientRect()
      
      const itemTaken = document.createElement(‘div’)
      itemTaken.classList.add(‘effect_animation’)
      itemTaken.innerHTML = `<img src = "./assets/${itemObject.image}.gif" ></img>`
      itemTaken.style.top = `${currentPlayerPosition.y}px`
      itemTaken.style.left = `${currentPlayerPosition.x}px`
      itemTaken.style.height = `${currentPlayerPosition.height}px`
      itemTaken.style.width = `${currentPlayerPosition.width}px`
      cover.appendChild(itemTaken)
      
      setTimeout(function(){
        itemTaken.style.top = `${scoreDisplay.getBoundingClientRect().y}px`
        itemTaken.style.left = `${scoreDisplay.getBoundingClientRect().x}px`
        itemToCollect -= 1  
      },100)

      setTimeout(function(){
        cover.removeChild(itemTaken)
        score += itemObject.score
        scoreDisplay.innerHTML = score
        scoreDisplayWrapper.classList.add(‘animate’)
        if (itemToCollect < 1){
          gameCompletionEvent()
          return
        }
      },1000)

      setTimeout(function(){ // animate score board
        scoreDisplayWrapper.classList.remove(‘animate’)
      },1200)

```


Similar animation technique is used when player loses life, and when Cat Blob catches Dog Blobs during invincibility. 

<br/>

### Creating the Maze

As explained earlier, the maze is created by mapping divs into a grid.  To position the walls and items, following function was used: 

```js
  function populateCells(array,classToAdd){
    for (let i = 0; i < array.length ; i++) {
      outerCells[array[i]].classList.add(classToAdd)
    }
  }
```

Each element (walls, item etc) has an array indicating their positions, which CSS looped through to add relevant class to each divs.

Position of each elements was planned by designing the maze in Google Sheets. The maze went through a number of iterations through trial and error. One of my earlier approaches involved looked like below:

<p align="center">
	  <img src="README_images/fig3.png" alt="diagram10" width="500" style="border-radius:8px" />
</p>

Through test plays, following issues were found:
*  Dog Blobs circulated similar routes, resulting in some areas becoming ‘unguarded’. 
*  Dog Blobs kept running into walls, unable to reach Cat Blob.

I altered the maze design to below, with following improvements:

#### Nest Position
Dog Blob’s ‘nest’ was originally positioned towards the centre of the maze, similar to where ghosts had their ‘home’ in original Pac-Man. Instead, I spread the nests around the maze. I also increased the number of Dog Blobs to five to ‘guard’ more areas.

#### More Warp Zones
In the original Pac-Man, when Pac-Man or ghosts went through a tunnel at the right edge of the screen, it ‘warped’ to the left edge of the screen and vice versa. I increased the number of warp zones to create more unexpected encounters between Cat Blob and Dog Blobs.

#### More ‘Open Spaces’ 
Due to how the Dog Blobs’ behaviours were coded, it did not work well when it was surrounded by too many walls. To fix this, I simply made some areas of the maze wider.

<p align="center">
	  <img src="README_images/fig4.png" alt="diagram11" width="500" style="border-radius:8px" />
</p>

Grids drawn in the spreadsheets were converted into arrays through a formula in the spreadsheet, then removing excess data such as spaces using VS Code:

<p align="center">
	  <img src="README_images/fig5.png" alt="diagram12" width="500" style="border-radius:8px" />
</p>

<p align="center">
	  <img src="README_images/fig6.png" alt="diagram13" width="500" style="border-radius:8px" />
</p>

<p align="center">
    <img src="README_images/fig7.png" alt="diagram14"  width="500" style="border-radius:8px" />
</p>


I made sure the walls were at least 2 divs thick - this enabled me to make the sprite slightly larger than the grid. Background image for the maze was drawn with this in mind. 

<p align="center">
	  <img src="README_images/sprite_size.png" alt="diagram15" style="border-radius:8px" />
	  <img src="README_images/sprite_size_2.png" alt="diagram16" style="border-radius:8px" />
</p>

<br/>

### Dog Blob’s Movement

I think the most interesting thing about Pac-Man is how the ghosts behave - in the original, each ghosts had different set of behaviours, which were influenced by player’s movement around the maze, and alternated using timers. 

Apparently the original game gave the ghosts following movement patterns: 
* **Chase** - Chases Pac-Man.
* **Scatter** - Ghost scattered to their designated target (each ghost had their specific target in the four corners of the maze, designed to make them spread out).
* **Frightened** - Ghost runs away from Pac-Man.

Based on the original, I made following ‘moods’ which shifted every 5 seconds:
* **Aggressive** - Similar to ‘chase’ in the original, Dog Blob’s position is influenced by Cat Blob’s position in the maze. For example, if Dog Blob is positioned lower in the grid, it is more likely to go upwards.  Movements are ultimately random, but to increase the chance for the Dog Blob to make the right decision, Dog Blob’s speed is increased (ie, the function triggering the Dog Blobs movement is called more frequently). 
* **Scatter** - Again, influenced by the original Pac-Man. Logic is the same as Aggressive, but the movement is based on a predetermined target, positioned in the four corners of the maze.
* **Cunning** - Instead of basing the movement on Cat Blob’s exact position, it bases it on 4 squares in front of Cat Blob (based on the direction it is facing). This was inspired by the behaviour of Pinky (pink ghost) in Pac-Man, which used a similar logic to ambush players.
* **Wander** - In this mood, Dog Blob would make decision based on its surrounding. For example, if there is a wall on the right or bottom, it will move up or left. Because it no longer bumps into walls, it moves around the maze smoothly when it is in this mood.

Dog Blob’s movement is ultimately random - it is decided by using `Math.random()` to select a direction from an array that has direction in them (eg [‘up’, ’down’, ’left’, ’right]).

However, this direction array is influenced by a number of factors, such as Dog Blob’s mood and Cat Blob’s positioned within the maze. For example, if  Cat Blob is position to the right of Dog Blob, direction ‘right’ is pushed into the direction array, making it more likely for Dog Blob to move right.

When Cat Blob becomes invincible,  the direction array is filtered to ensure Dog Blob does not move towards Cat Blob. 

</br>

### Dog Blob’s Personality

Each Dog Blobs is given its unique pattern of mood. For example, Dog Blob One has the following ‘mood range’:
```
 moodRange:
[‘scatter_A’, ’aggressive_A’, ’aggressive_B’, ’aggressive_C’, ’wander_A’, ’wander_B’, ’aggressive_D’]
```

In other words, it starts with Scatter for 5 seconds, then becomes Aggressive for 15 seconds, changes to Wander for 10 seconds and becomes Aggressive again for 5 seconds. However, Dog Blob One is less dangerous than other Dog Blobs because its speed when Aggressive is much slower.

Also, each Dog Blobs ‘wake up’ from their nests based on progression of the  game:

* **Dog Blob One:** wakes up 1 second after game starts.
* **Dog Blob Two:** wakes up once Cat Blob collects 20 items.
* **Dog Blob Three:** wakes up once Cat Blob collects 2 blue stars.
* **Dog Blob Four:** wakes up 2 seconds after either Dog Blob Two and/or Three wakes up.
* **Dog Blob Five:** wakes up once Cat Blob collects 225 items (Dog Blob Five is very fast when Aggressive, so players should try to collect stars near his nest before he wakes up… )

<br/>

### Notable Bugs

There were many bugs whilst putting together this game - I have noted below those I found interesting, with comments on how they were resolved.

#### Mood Timer
Mood Timers are initiated at the beginning of the game - originally, the timer was running with `setInterval`, and continued to count even after game was complete, meaning that Dog Blobs carried over their mood from the previous game.  Also, the timer carried on even when the game was paused. Similar bug also occurred for Invincibility and Flicker mode (when player loses life,  player cannot lose life and cannot pick up item for 3 seconds). If Cat Blob was either in flicker mode or invincible when game ended, the effect had carried over to the next game. To fix these issues, conditional flow was added to ensure that the timers only counted when game in play, and also it was reset after each game. 

#### Game Reset with Spacebar
The game can be paused by pressing spacebar. However, sometimes this triggered the countdown animation to start. It took a while to figure out the reason, but it seems when spacebar is pressed, the browser think the user is trying to press a button that was recently clicked.  In other words, the browser was triggering the game start button. To fix this, conditional flow was added to make sure game start function was only triggered when game was not in play.

#### Strange Overlap
Because of how the characters are displayed on the screen, when Cat Blob moved near Dog Blobs, layers did not display correctly (see diagram below).

This was because Dog Blobs had higher `z-index` than Cat Blob.

<p align="center">
	  <img src="README_images/fig8.png" alt="diagram17"  width="400" style="border-radius:8px" />
</p>


To fix this, `z-index` is adjusted each time characters moved around the maze - lower it is in the grid, higher the `z-index` becomes, ensuring that images overlap correctly.

<p align="center">
	  <img src="README_images/fig9.png" alt="diagram18"  width="400" style="border-radius:8px" />
</p>

<br/>

## Final Thoughts

### Wins and Challenges
Since this was a one week project, there were several features I couldn't complete in time, such as bonus items, moveable walls etc. I did however squeeze in some sounds (sound effects created by chip-munking my own voice in Garage Band) and a touch mode for mobile and tablets. As well as gaining more confidence working with the DOM and learning new JavaScript Tricks, I ended up with several code snippets which may lead to new projects.

Controlling the behaviour of Dog Blobs was the most challenging - I found that making them run away from the player was relatively simple, but making them chase the player was difficult. I tested Dog Blob's movement many times, adjusting the wall positions to work out how it affected their motion. It made me realise how cleverly the level was put together in the original Pac-Man. I think the logic developed for Dog Blob's behaviour could be adapted for non-game websites, perhaps for making dynamic contents that react to user's interaction.

<br />

### Key Learnings
This was the first time I made a game, so at the begininning I had very little idea of how to realise it, so I built one function at a time, figuring things out as I went. I tried to apply the different methods and concepts learnt during the lesson at General Assembly. It made me appreciate how different functions could work together, sometimes with completely unexpected results. As the game became more complex, I spent more time debugging. 

At one point, I added a feature to create and delete walls by clicking on the grids, which could be used to guide the movement of Dog Blobs. This was taken out of the final game, but I think it could be developed into a different kind of game. 

It was a continual experiment, which made me struggle at times, but I am pleased with the outcome, and it was really fun to work on. 

(Click [here](http://www.ma5a.com/catblob/) to see project.)

<p align="center">
	  <img src="README_images/game_play_3.png" alt="cat blob game play" width="600" style="border-radius:8px" />
</p>

<p align="center">
	  <img src="README_images/complete.png" alt="cat blob complete screen" width="600" style="border-radius:8px" />
</p>