# Indexed
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://makeapullrequest.com)

Indexed is a digital flash card web app that allows users to save card decks and tracks their weekly progress.

## 🚀 Features
- ✨ Deck Creation – Users can create learning subject categories, specified decks, and cards for the deck. 
- 📚 Study Sessions – After users create their deck, they can study these decks and see direct results.  
- ✅ Goal Tracking - To get user's inspired, Indexed tracks your daily time usage, cards you've mastered, and your best percentage that day.


## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jacobcasas/Indexed.git

# Install dependencies
npm install
```

## 🔧 Usage
Indexed currently resides at the [Indexed Web App](https://indexed-flash.netlify.app/). Everything storage is based with localStorage only, so you can't sign in from different devices (yes this *was* on purpose). 

## 🤝 Contribution
Indexed would love some contribution, just dont judge my code I'm learning. Anyway, here are the steps to contributing: 

1. Fork the project
2. Create your own feature branch 
```bash
git checkout -b feature/MyCoolFeature
```
3. Do all your cool feature things then commit your changes.
```bash
git commit -m "Added MyCoolFeature"
```
4. Push commit your branch.
```bash
git push origin feature/MyCoolFeature
```
5. Open a Pull request.

---

## 📍 Roadmap
The features of the Indexed app live in pages:

### Dashboard
The dashboard is where you can access all the other apps features. User's can see their goal information, their decks and their study session history.

### Deck Creation
Deck creation is accessible on the dashboard in the "your deck" section. Deck creation allows users to make their own categories, decks, and the description of that deck. The decks and categories are then saved to localStorage with "categories" and "decks" named respectively. Decks and categories then match up to each other on the dashboard after creation.

### Edit Deck
The edit deck page allows users to make cards for their deck. The "card" consist of 2 user inputs: the **front** or *prompt* of the card, and the **back** or *answer* of the card. Once users continue on to the next card, the card they just created will save in a list item that is displayed under the card input. Users will be able to edit or delete these cards as they're made. 

### Study Session
Study sessions attempt to simulate how studying index cards feels:
1. user sees prompt
2. user guesses answer
3. mark whether correct or incorrect

Indexed handles study session similarly but adds a key feature: the *buttons* under the card prompts users to mark whether the got the answer right or wrong. Answering honestly allows users to receive accurate results and most importantly, shows the prompt and answer of the incorrect cards.

If you want to come back later, and remember what deck you needed work on, the study session history is on your dashboard.

## 😇 Acknowledgements
### My Inspiration
If you're making a flash card app, it's really hard not to acknowledge Anki. It's what I was using before I made Indexed. My app isn't nearly as good but I was very inspired while using it and I also needed a good project for my portfolio. I don't think its perfect by any means, but hey, it ain't bad. I'm pretty proud.

### ❤️❤️ CONTRIBUTORS 
Here are the contributors. Don't hesitate to put your name. Whether you made a whole feature or a little clarity comment. I appreciate you all the same. 

- **Jacob Casas**: Created this goofy web app.

## 📄 License
Distributed under an MIT License. See the [LICENSE](LICENSE) file for more details.