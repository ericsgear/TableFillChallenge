# Table Fill Challenge
## By Eric Ingamells
### For Eric's Gear YouTube [video]()

Thank you for looking at my code. I know it's minimal, but it's good for a reference.

Since I made the video, I've worked to improve it, including adding another Business Logic (BL) version, which I called "Memory Saver".

I also am now running the original BL code with the Simplified code and the Memory Saver, so I'm displaying each in it's own table for you to see that they are the same. I've also put a max limit on how big the table is, because some table sizes will be just too big to display in any reasonable manner.

I've also added a table showing the comparison of the results of each BL version. This replaces the `console.log` and running the code after changing the BL.

I've also added code to clear out the data after running the BL, so it's not unnecessarily taking up your computer's and browser's RAM.

There's a lot of other improvements, too. Some of them obscure the original idea of the "challenge", so I'm not sure I like them, but I did it in the vein of reducing memory usage. I did leave some code in, due to ease of reading and the idea it might save some CPU cycles by not needing to traverse multiple layers of an object.

And since there's now 3 tables to display, I updated that method to allow displaying the 3 different ways I'm storing data in each array.

To make this a little more user friendly, I've added a text box and button so you can simply enter the size of the array you want to test. I'll remind you that the time to calculate the results can grow exponentially, so explore at your own risk. And feel free to close the browser tab if it takes "too long" or taxes your system too much. For instance, on my 7 year old ROG gaming laptop, it takes just over 7 seconds to calculate the results for the Memory Saver BL when I enter "1000" for the table size. And when I enter "1200", it takes nearly 15 seconds for that "minor" increase. But for a table size of 100, it takes 1 millisecond.

I'd like to find a faster way to do `indexOf` for the Memory Saver BL, but the other options I tried were either slower, used too much memory, or the extra code was overly complicated.

Last, and probably least, I added an `alert` to let you know when the calculations are all done. Of course, you see the alert box before it updates the displayed data, unfortunately, but I'm not going to build my own display for this project, even as minimal as that could be.

Of course, there's a lot more I could do to compact the code, but I'm not into doing code golf in general, and I think doing that would lose a lot of people this is supposed to target. I simply made this as compact as I would while maintaining readability, as readability is a significant factor when coding as a development team in a company.

If you have suggestions, feel free to Fork this repo and send me a link with a description of what you did. I may add your link to this ReadMe file if I think your changes are inline with what I'm trying to demonstrate.