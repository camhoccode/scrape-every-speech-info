# scrape-every-speech-info

Given a web page contain list of speeches from good authors, the script would extract all nesseary information about each speech in the link
- Link: https://archive.org/details/audio?query=podcast+meditation&and%5B%5D=collection%3A%22podcasts%22&and%5B%5D=languageSorter%3A%22English%22&and%5B%5D=mediatype%3A%22audio%22&and%5B%5D=subject%3A%22meditation%22&and%5B%5D=subject%3A%22spirituality%22&and%5B%5D=subject%3A%22sermon%22&and%5B%5D=subject%3A%22unitarian+universalist%22&and%5B%5D=subject%3A%22spiritual+awakening+radio%22&and%5B%5D=subject%3A%22james+bean%22&and%5B%5D=subject%3A%22sant+mat%22&and%5B%5D=subject%3A%22surat+shabd+yoga%22&and%5B%5D=subject%3A%22santmat%22&and%5B%5D=subject%3A%22Meditation%22&and%5B%5D=subject%3A%22spiritual+podcasts%22&and%5B%5D=subject%3A%22inner+light+and+sound%22&and%5B%5D=subject%3A%22science+of+spirituality%22&and%5B%5D=subject%3A%22love%22&and%5B%5D=subject%3A%22science+of+the+soul%22&and%5B%5D=subject%3A%22sant+mat+satsang+podcasts%22&and%5B%5D=subject%3A%22hope+and+light%2C+the+beloved+community%22&and%5B%5D=subject%3A%22God%22&and%5B%5D=subject%3A%22path+of+the+masters%22&and%5B%5D=subject%3A%22Sant+Mat+Satsang+Podcasts%22&and%5B%5D=subject%3A%22Spiritual+Awakening+Radio%22&and%5B%5D=subject%3A%22soul+travel%22&and%5B%5D=subject%3A%22Santmat%22&and%5B%5D=subject%3A%22Spirituality%22&and%5B%5D=subject%3A%22consciousness%22&sort=-week&page=4
- Info sample:
output = [  
   {
      "title": "614 Meditation And Psychedelics",
      "keyword": [
        "Mike Sapiro",
        "meditation",
        "Buddhism",
        "psychedelics",
        "yoga"
      ],
      "linkMP3": "https://archive.org/download/614meditationandpsychedelics/614-MeditationAndPsychedelics.mp3"
    },
    {
      "title": "579 Stolaroff Psychedelics And Meditation",
      "keyword": ["Myron Stolaroff", "meditation", "Buddhism", "psychedelics"],
      "linkMP3": "https://archive.org/download/579StolaroffPsychedelicsAndMeditation/579-StolaroffPsychedelicsAndMeditation.mp3"
    }
    ]
