# SYNC CONVERTER TOOL
Sync converter tool is a ZXQM's lyrics sync tool used to convert the spotify lyric system into zxqm's lyric system.

> [!WARNING]
> This code is ran in python, please install the latest version [here](https://www.python.org/downloads/).


To use this tool you need to follow these steps:
## 1. Install the project.
Download and extract the project into a folder.

## 2. Set-up the "input.json" file.
To do that, you need to modify the json file.

In the json file you will find this structure:

```json
{
    "Lyrics": [
        {
            "startTimeMs": "0",
            "words": "Lyric line 1",
            "syllables": [],
            "endTimeMs": "0"
        },
        {
            "startTimeMs": "3970",
            "words": "Lyric line 2",
            "syllables": [],
            "endTimeMs": "0"
        },
        // repeat for all the lyrics
    ]
}
```

> [!CAUTION]
> It's important not to remove the "Lyrics" array, because the python script checks if the Lyrics array exists, if not it will return an error.

Now, go to spotify and open dev tools by pressing `Ctrl` + `Shift` + `I` or `Right Click` and `Inspect`.

Go to the `Network` tab and press `Fetch/XHR`.

Then, play the song for a couple seconds and open the lyrics section by pressing the microphone icon.

If nothing went wrong, you should be able to see a fetch request to the musixmatch API.

Enter this url in the filter tab: `https://spclient.wg.spotify.com/color-lyrics/`.

Select the first one and then select the `Response` tab.

You should be able to view something like this:
```json
{
    "lyrics": {
        "syncType": "LINE_SYNCED",
        "lines": [
            {
                "startTimeMs": "0",
                "words": "Lyric line 1",
                "syllables": [],
                "endTimeMs": "0"
            },
            {
                "startTimeMs": "3970",
                "words": "Lyric line 2",
                "syllables": [],
                "endTimeMs": "0"
            },
            // repeat for all the lyrics
        ],
        // Useful data
    },
    // More data
}
```
You'll need to copy the contents of the "lines" array and replace the content in the "Lyrics" array (`input.json` file).

Then you'll be ready to the next step!

## 3. Set-up the python file.
> [!IMPORTANT]
> The python file should have zero problems.
> Follow these steps to avoid any problem you may have.

In the python file it is this line of code:

```python
archivo_json = './input.json'
```
This line of code shouldn't have any problem, but if you have a problem finding the `input.json` file, change the route to the directory where the file is located.

## 4. Run the python file.
Now you can run the python file using the following command
```cmd
& [YOUR PYTHON ROUTE] "[PYTHON FILE DIRECTORY]"
```
_The text inside brackets needs to be replaced_

## 5. Enjoy!
Now you have generated a `ouput.json` file that contains the correctly formatted lyrics for ZXQM's Lyrics System.
