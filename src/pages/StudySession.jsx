import { useEffect, useRef, useState } from "react";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { getDecks, saveDecks } from "../utils/storage";
import { useDeck } from "../hooks/useDeck";
import "../styles/pages/studysession.css";
import CompleteSession from "./CompleteSession";

function StudySession() {
  const { deckId } = useParams();
  const { deck, setDeck } = useDeck(deckId);

  const [showBack, setShowBack] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [sessionCards, setSessionCards] = useState([]);

  const [testResults, setTestResults] = useState(() => {
    const stored = localStorage.getItem("results");
    return stored ? JSON.parse(stored) : [];
  });


  const initializedRef = useRef(false);

  const shuffleInPlace = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  useEffect(() => {
    setShowBack(false);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCards([]);
    setIsSessionComplete(false);
    setSessionCards([]);
    initializedRef.current = false;
  }, [deckId]);


  useEffect(() => {
    if (!initializedRef.current && deck?.cards?.length) {
      const shuffled = [...deck.cards];
      shuffleInPlace(shuffled);
      setSessionCards(shuffled);
      setCurrentIndex(0);
      setShowBack(false);
      initializedRef.current = true;
    }
  }, [deck]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(testResults));
  }, [testResults]);

  useEffect(() => {
    if (!isSessionComplete || !deck || sessionCards.length === 0) return;

    const newResult = {
      id: crypto.randomUUID(),
      title: deck.title,
      score: `${correctCount} / ${sessionCards.length}`,
      percentage: Math.round((correctCount / sessionCards.length) * 100),
      createdAt: Date.now(),
    };

    setTestResults((prev) => [...prev, newResult]);
  }, [isSessionComplete, deck, sessionCards.length, correctCount]);

  const advance = () => {
    if (currentIndex >= sessionCards.length - 1) {
      setIsSessionComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setShowBack(false);
    }
  };

  const handleCorrectAnswer = () => {
    const currentCard = sessionCards[currentIndex];
    if (!currentCard) return;

    const editedCard = {
      ...currentCard,
      masteryCount: (currentCard.masteryCount ?? 0) + 1,
      mastered: (currentCard.masteryCount ?? 0) + 1 >= 5,
      masteredOn:
        (currentCard.masteryCount ?? 0) + 1 >= 5
          ? new Date().toISOString().split("T")[0]
          : currentCard.masteredOn || null,
    };

    const updatedDeck = {
      ...deck,
      cards: deck.cards.map((c) => (c.id === editedCard.id ? editedCard : c)),
    };

    setDeck(updatedDeck);
    const all = getDecks();
    saveDecks(all.map((d) => (d.id === updatedDeck.id ? updatedDeck : d)));

    setCorrectCount((c) => c + 1);
    advance();
  };

  const handleIncorrectAnswer = () => {
    const currentCard = sessionCards[currentIndex];
    if (currentCard) {
      setIncorrectCards((prev) => [...prev, currentCard]);
    }
    advance();
  };

  const determineResultMessage = () => {
    if (correctCount === sessionCards.length) {
      return <h2>You got 100%!</h2>;
    }
    return (
      <div className="incorrect-card-list">
        <h2 className="color-attention">
          Cards you <br />
          missed:
        </h2>
        <ol>
          {incorrectCards.map((card, idx) => (
            <li key={`${card.id}-${idx}`}>
              {card.front} / {card.back}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  if (!deck) return <p>Deck not found...</p>;
  if (!initializedRef.current || sessionCards.length === 0) {
    return (
      <div className="page-container">
        <header className="study-session-heading">
          <h1>Study Session: {deck.title}</h1>
          <h5 className="color-gray-400">{deck.description}</h5>
        </header>
        <p>Preparing cards…</p>
      </div>
    );
  }

  if (isSessionComplete) {
    return (
      <CompleteSession
        score={`${correctCount}/${sessionCards.length} | ${(
          (correctCount / sessionCards.length) *
          100
        ).toFixed(0)}%`}
        incorrect={determineResultMessage()}
        onRetry={() => {
            setCorrectCount(0);
            setIncorrectCards([]);
            setCurrentIndex(0);
            setIsSessionComplete(false);
        }}
      />
    );
  }

  const card = sessionCards[currentIndex];

  return (
    <div className="page-container">
      <header className="study-session-heading">
        <h1>Study Session: {deck.title}</h1>
        <h5 className="color-gray-400">{deck.description}</h5>
      </header>

      <div className="study-card-and-count">
        <h3 className="center-text">
          Card {currentIndex + 1}/{sessionCards.length}
        </h3>
        <div className="study-card">
          <h4>{showBack ? card?.back : card?.front}</h4>
        </div>
      </div>

      <div className="study-under-card">
        <Button
          label="Flip Card"
          type="neutral"
          onclick={() => setShowBack((s) => !s)}
        />
        <div className="correct-prompt">
          <h5>Did you guess correctly?</h5>
          <div className="prompt-buttons">
            <Button label="X" type="attention" onclick={handleIncorrectAnswer} />
            <Button
              label="&#x2713;"
              type="success"
              onclick={handleCorrectAnswer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudySession;
