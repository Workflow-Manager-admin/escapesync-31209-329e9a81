import React, { useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Main container for EscapeSync collaborative escape room experience.
 * Integrates real-time puzzle area, chat, countdown timer, player avatars, and immersive UI layout.
 */
function EscapeSyncContainer() {
  // Demo: players (avatars), progress, timer, chat and puzzle state (use backends/websockets for production)
  const [players, setPlayers] = useState([
    { id: 1, name: 'Alex', avatar: '🧑‍🦱', progress: 65 },
    { id: 2, name: 'Sam', avatar: '🧑‍🎤', progress: 80 },
    { id: 3, name: 'Jordan', avatar: '🧑‍💻', progress: 55 }
  ]);
  const [messages, setMessages] = useState([
    { player: 1, text: 'Did anyone solve puzzle 2 yet?', time: '00:10' },
    { player: 2, text: 'I found a hint in the bookshelf!', time: '00:12' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Timer state
  const TOTAL_TIME = 15 * 60; // 15 minutes in seconds, customizable
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const timerInterval = useRef(null);

  // Puzzle state (demo display; extendable!)
  const [puzzleState, setPuzzleState] = useState({
    clue: '🔒 What is the code for the vault? (Hint: Look at the wall painting colors.)',
    solved: false,
    userInput: ''
  });

  // Countdown timer effect
  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval.current);
  }, []);

  // Format timer as mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle new chat message
  // PUBLIC_INTERFACE
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;
    setMessages([
      ...messages,
      {
        player: 1, // Assume self (demo); would use real player id
        text: chatInput,
        time: formatTime(TOTAL_TIME - timeLeft)
      }
    ]);
    setChatInput('');
  };

  // Handle puzzle input/submit
  // PUBLIC_INTERFACE
  const handlePuzzleInput = (e) => {
    setPuzzleState({
      ...puzzleState,
      userInput: e.target.value
    });
  };

  // PUBLIC_INTERFACE
  const handlePuzzleSubmit = (e) => {
    e.preventDefault();
    // Demo: correct answer is "BLUE"
    if (puzzleState.userInput.trim().toUpperCase() === 'BLUE') {
      setPuzzleState({ ...puzzleState, solved: true });
      // instantly update progress for first player (simulate)
      setPlayers(players.map((p, i) =>
        i === 0 ? { ...p, progress: 100 } : p
      ));
    } else {
      setPuzzleState({ ...puzzleState, userInput: '' });
      alert('Incorrect! Try again.');
    }
  };

  // UI THEME/COLORS
  const theme = {
    primary: '#1a1a2e',      // deep blue
    secondary: '#16213e',    // slate blue
    accent: '#e94560',       // vivid red
    lightText: '#fff',
    bgPuzzle: 'linear-gradient(135deg, #16213e 80%, #1a1a2e 100%)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.primary,
      fontFamily: 'Inter, sans-serif',
      color: theme.lightText,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* TIMER BAR */}
      <header style={{
        background: theme.secondary,
        color: theme.accent,
        padding: '16px 0',
        textAlign: 'center',
        letterSpacing: '3px',
        fontWeight: 700,
        fontSize: '1.5rem',
        width: '100%',
        borderBottom: `2px solid ${theme.accent}`,
        boxShadow: '0 2px 8px rgba(25,25,50,0.15)'
      }}>
        <span style={{ marginRight: 24, verticalAlign: 'middle' }}>⏰</span>
        <span style={{ color: theme.lightText, fontSize: '2rem', marginRight: 18 }}>
          {formatTime(timeLeft)}
        </span>
        <span style={{
          fontWeight: 400, color: theme.accent, fontSize: '1.1rem', marginLeft: 18
        }}>
          Escape Room Countdown
        </span>
      </header>

      <main style={{
        display: 'flex',
        flex: 1,
        background: theme.bgPuzzle,
        minHeight: 0,
        marginTop: 0,
        overflow: 'hidden'
      }}>
        {/* LEFT: MAIN PUZZLE AREA */}
        <section style={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'rgba(26,26,46,0.98)',
          padding: '32px 8px',
          position: 'relative',
          borderRight: `2px solid ${theme.secondary}`,
          boxShadow: '8px 0 24px 0 rgba(50,60,100,0.07)'
        }}>
          {/* PLAYER AVATARS & PROGRESS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 24,
            width: '100%',
            justifyContent: 'center'
          }}>
            {players.map((p) => (
              <div key={p.id} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '2.1rem',
                    background: theme.secondary,
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2.5px solid ${theme.accent}`,
                    marginBottom: 6,
                    marginLeft: 'auto', marginRight: 'auto'
                  }}
                  title={p.name}
                >{p.avatar}</div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.lightText,
                  marginBottom: 2
                }}>{p.name}</div>
                <div
                  style={{
                    background: '#232345',
                    width: 46,
                    height: 5,
                    borderRadius: 2,
                    overflow: 'hidden',
                    margin: '0 auto'
                  }}>
                  <div style={{
                    width: `${p.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${theme.accent}, #6b7aff 70%)`,
                    transition: 'width 0.5s'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* PUZZLE BOX */}
          <div
            style={{
              background: 'rgba(16,33,62,0.97)',
              border: `2.5px solid ${theme.accent}`,
              borderRadius: 14,
              boxShadow: '0 8px 42px rgba(29,29,60,0.15)',
              padding: 28,
              maxWidth: 390,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 auto'
            }}>
            {/* Puzzle Title */}
            <h2
              style={{
                color: theme.accent,
                letterSpacing: 1,
                fontFamily: 'inherit',
                margin: 0,
                fontWeight: 700,
                fontSize: '1.32rem'
              }}
            >
              {puzzleState.solved ? '🎉 Puzzle Solved!' : '🔒 Active Puzzle'}
            </h2>
            {/* Puzzle Clue / Text */}
            <div style={{
              color: theme.lightText,
              fontSize: '1.13rem',
              margin: '18px 0 0 0',
              textAlign: 'center',
              minHeight: '2.1em'
            }}>
              {puzzleState.solved
                ? <span style={{ color: '#98df88' }}>Congratulations! The vault is open. 🚪</span>
                : puzzleState.clue}
            </div>

            {/* Puzzle input, only if not solved */}
            {!puzzleState.solved && (
              <form
                onSubmit={handlePuzzleSubmit}
                style={{ width: '100%', marginTop: 20, display: 'flex', gap: 8 }}
              >
                <input
                  type="text"
                  value={puzzleState.userInput}
                  onChange={handlePuzzleInput}
                  placeholder="Your answer…"
                  style={{
                    flex: 1,
                    background: theme.secondary,
                    color: '#fff',
                    border: `1.2px solid ${theme.accent}`,
                    borderRadius: 5,
                    padding: '8px 12px',
                    fontSize: '1.06rem',
                    outline: 'none'
                  }}
                  aria-label="Puzzle Answer"
                  disabled={puzzleState.solved}
                  autoFocus
                  spellCheck={false}
                />
                <button
                  type="submit"
                  style={{
                    background: theme.accent,
                    border: 'none',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: 5,
                    padding: '8px 18px',
                    fontSize: '1.06rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(233,69,96,0.10)'
                  }}
                  disabled={puzzleState.userInput.trim() === ''}
                >
                  Unlock
                </button>
              </form>
            )}
          </div>
        </section>

        {/* RIGHT: CHAT SIDEBAR */}
        <aside style={{
          width: 340,
          background: 'rgba(22,33,62,0.97)',
          borderLeft: `2px solid ${theme.secondary}`,
          boxShadow: '-8px 0 32px rgba(25,32,60,0.10)',
          minHeight: 0,
          padding: '0 0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat Header */}
          <div style={{
            background: '#232345',
            color: theme.accent,
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1.18rem',
            padding: '20px 0 8px 0',
            borderBottom: `2px solid ${theme.secondary}`,
            letterSpacing: 1
          }}>
            <span role="img" aria-label="Chat" style={{ marginRight: 6 }}>💬</span>
            Team Chat
          </div>
          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px 20px 0 16px',
            background: 'rgba(26,26,46,0.97)',
            borderRadius: 0
          }}>
            {messages.map((msg, idx) => {
              const player = players.find(p=>p.id===msg.player) || {name: "?", avatar:"❓"};
              return (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: 13,
                  gap: 7
                }}>
                  <span style={{
                    fontSize: '1.28rem',
                    marginRight: 3
                  }}>{player.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <div>
                      <span style={{
                        fontWeight: 600,
                        color: theme.accent,
                        fontSize: 13
                      }}>{player.name}</span>
                      <span style={{
                        color: '#b6bfdc',
                        fontSize: 11,
                        marginLeft: 7
                      }}>{msg.time}</span>
                    </div>
                    <div style={{
                      color: theme.lightText,
                      fontSize: 15,
                      marginLeft: 2
                    }}>{msg.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '14px 12px',
              borderTop: `2px solid ${theme.secondary}`,
              background: 'rgba(22,33,62,1.00)'
            }}>
            <div style={{ display: 'flex', gap: 7 }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Message your team…"
                style={{
                  flex: 1,
                  borderRadius: 5,
                  border: `1.2px solid ${theme.accent}`,
                  padding: '8px 12px',
                  color: theme.lightText,
                  background: 'rgba(44,51,80,1)',
                  fontSize: '1.04rem',
                  outline: 'none'
                }}
                aria-label="Type chat message"
                spellCheck={false}
                maxLength={140}
                autoFocus={false}
              />
              <button
                type="submit"
                style={{
                  background: theme.accent,
                  color: "#fff",
                  border: 'none',
                  borderRadius: 5,
                  fontWeight: 700,
                  padding: '8px 18px',
                  fontSize: '1.06rem',
                  marginLeft: 2,
                  cursor: 'pointer'
                }}
                disabled={chatInput.trim() === ''}
              >Send</button>
            </div>
          </form>
        </aside>
      </main>

      {/* IMMERSIVE BACKGROUND EFFECT */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, zIndex: -1,
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at 60% 35%, #e9456030 0%, #16213e80 80%, #1a1a2e 100%)',
        pointerEvents: 'none',
        transition: 'background 1.3s'
      }} />
    </div>
  );
}

export default EscapeSyncContainer;
