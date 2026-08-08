import React, { useState } from "react";
import "./App.css";

function App() {
  // =========================
  // AUTH
  // =========================

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const loggedIn = localStorage.getItem("abt_logged_in");
      const savedUser = localStorage.getItem("abt_user");

      if (loggedIn === "true" && savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      localStorage.removeItem("abt_logged_in");
      localStorage.removeItem("abt_user");
    }

    return null;
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const savedUser = localStorage.getItem("abt_user");

    if (!savedUser) {
      setLoginError("No account found. Please sign up first.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const email = loginData.email.trim().toLowerCase();
      const savedEmail = (user.email || "").trim().toLowerCase();

      if (
        email === savedEmail &&
        loginData.password === user.password
      ) {
        setCurrentUser(user);

        localStorage.setItem("abt_user", JSON.stringify(user));
        localStorage.setItem("abt_logged_in", "true");

        setShowLogin(false);

        setLoginData({
          email: "",
          password: "",
        });

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch {
      setLoginError("Something went wrong. Please sign up again.");
    }
  };

  // =========================
  // SIGN UP
  // =========================

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError("");

    const name = signupData.name.trim();
    const email = signupData.email.trim().toLowerCase();
    const password = signupData.password;

    if (!name || !email || !password) {
      setSignupError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setSignupError("Password must contain at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("abt_user");

    if (existingUser) {
      try {
        const oldUser = JSON.parse(existingUser);

        if (oldUser.email?.toLowerCase() === email) {
          setSignupError(
            "This email is already registered. Please log in."
          );
          return;
        }
      } catch {
        // Ignore invalid stored data
      }
    }

    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem("abt_user", JSON.stringify(newUser));
    localStorage.setItem("abt_logged_in", "false");

    setSignupData({
      name: "",
      email: "",
      password: "",
    });

    setSignupError("");
    setShowSignup(false);
    setShowLogin(true);

    setLoginData({
      email: "",
      password: "",
    });
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.setItem("abt_logged_in", "false");
    setCurrentUser(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // NAVIGATION
  // =========================

  const goToChallenge = () => {
    document.getElementById("challenge")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToHow = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToLeaderboard = () => {
    document.getElementById("leaderboard")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =========================
  // OPEN LOGIN
  // =========================

  const openLogin = () => {
    setLoginError("");

    setLoginData({
      email: "",
      password: "",
    });

    setShowSignup(false);
    setShowLogin(true);
  };

  // =========================
  // OPEN SIGNUP
  // =========================

  const openSignup = () => {
    setSignupError("");

    setSignupData({
      name: "",
      email: "",
      password: "",
    });

    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <div className="brand">
          <div className="brand-icon">AB</div>
          <span>ABTalks</span>
        </div>

        <nav className="nav-links">
          <button onClick={goToChallenge}>
            Challenge
          </button>

          <button onClick={goToHow}>
            How it works
          </button>

          <button onClick={goToLeaderboard}>
            Leaderboard
          </button>
        </nav>

        <div className="nav-right">

          {currentUser ? (
            <div className="logged-user">

              <div className="user-avatar">
                {(currentUser?.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span className="user-name">
                {currentUser?.name || "User"}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Log out
              </button>

            </div>
          ) : (
            <button
              className="login-nav-btn"
              onClick={openLogin}
            >
              Log in
            </button>
          )}

        </div>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section className="hero">

          <div className="challenge-pill">
            <span>♨</span>
            60 DAY CODING CHALLENGE
          </div>

          <h1>
            Build every day.
            <br />
            <span>Become impossible to ignore.</span>
          </h1>

          <p className="hero-text">
            Code. Share. Stay consistent. Build a public proof
            of work that gets you noticed by recruiters.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={goToChallenge}
            >
              Start the challenge
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={goToChallenge}
            >
              Explore the challenge
            </button>

          </div>

          <div className="students">

            <div className="student-circles">
              <span>DS</span>
              <span>AK</span>
              <span>RK</span>
              <span>+</span>
            </div>

            <p>
              <strong>12,400+</strong>{" "}
              students are building in public
            </p>

          </div>

        </section>


        {/* =========================
            STATS
        ========================= */}

        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon">♨</div>
            <strong>60</strong>
            <span>Days</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon">&lt;/&gt;</div>
            <strong>60</strong>
            <span>Builds</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◎</div>
            <strong>2</strong>
            <span>Daily proofs</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon">♜</div>
            <strong>1</strong>
            <span>Public streak</span>
          </div>

        </section>


        {/* =========================
            HOW IT WORKS
        ========================= */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            One day at a time.
          </h2>

          <div className="steps">

            <div className="step">
              <span>01</span>
              <h3>Pick your track</h3>
              <p>
                Choose the skill or technology you want to improve.
              </p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Build something</h3>
              <p>
                Spend time every day building something real.
              </p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Prove the work</h3>
              <p>
                Submit your GitHub commit and LinkedIn post.
              </p>
            </div>

          </div>

        </section>


        {/* =========================
            PROGRESS
        ========================= */}

        <section className="progress-section">

          <div className="section-label">
            YOUR PROGRESS
          </div>

          <div className="progress-header">

            <div>
              <h2>
                Keep the streak alive.
              </h2>

              <p>
                Every day you build is another day of proof.
              </p>
            </div>

            <div className="progress-day">
              <strong>Day 24</strong>
              <span>of 60</span>
            </div>

          </div>

          <div className="progress-card">

            <div className="progress-top">
              <span>24 day streak 🔥</span>
              <strong>40%</strong>
            </div>

            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>

            <div className="progress-days">
              <span>Day 1</span>
              <span>Day 15</span>
              <span>Day 30</span>
              <span>Day 45</span>
              <span>Day 60</span>
            </div>

          </div>

          <div className="mini-stats">

            <div>
              <strong>24</strong>
              <span>Days completed</span>
            </div>

            <div>
              <strong>24</strong>
              <span>GitHub commits</span>
            </div>

            <div>
              <strong>24</strong>
              <span>LinkedIn proofs</span>
            </div>

          </div>

        </section>


        {/* =========================
            CHALLENGE
        ========================= */}

        <section
          className="challenge-section"
          id="challenge"
        >

          <div className="section-label">
            YOUR CHALLENGE
          </div>

          <h2>
            Your next 60 days start here.
          </h2>

          <p>
            Stop waiting to feel ready. Start building.
          </p>

          <button
            className="primary-btn join-btn"
            onClick={() => {
              if (currentUser) {
                alert(
                  `Welcome ${currentUser.name}! Your 60-day challenge starts now.`
                );
              } else {
                openSignup();
              }
            }}
          >
            {currentUser
              ? "Continue challenge"
              : "Join ABTalks"}

            <span>→</span>
          </button>

        </section>


        {/* =========================
            LEADERBOARD
        ========================= */}

        <section
          className="leaderboard-section"
          id="leaderboard"
        >

          <div className="section-label">
            COMMUNITY
          </div>

          <div className="leaderboard-heading">

            <div>
              <h2>
                Consistency gets noticed.
              </h2>

              <p>
                See who's showing up every single day.
              </p>
            </div>

            <span className="live-badge">
              ● LIVE
            </span>

          </div>

          <div className="leaderboard">

            <div className="leader leader-first">

              <div className="rank">
                #1
              </div>

              <div className="leader-avatar">
                P
              </div>

              <div className="leader-info">
                <strong>Priya</strong>
                <small>Frontend Track</small>
              </div>

              <div className="leader-stat">
                <strong>58</strong>
                <small>day streak</small>
              </div>

              <div className="leader-proof">
                ✓ 116 proofs
              </div>

            </div>


            <div className="leader">

              <div className="rank">
                #2
              </div>

              <div className="leader-avatar">
                A
              </div>

              <div className="leader-info">
                <strong>Arjun</strong>
                <small>AI / ML Track</small>
              </div>

              <div className="leader-stat">
                <strong>54</strong>
                <small>day streak</small>
              </div>

              <div className="leader-proof">
                ✓ 108 proofs
              </div>

            </div>


            <div className="leader">

              <div className="rank">
                #3
              </div>

              <div className="leader-avatar">
                M
              </div>

              <div className="leader-info">
                <strong>Meera</strong>
                <small>Full Stack Track</small>
              </div>

              <div className="leader-stat">
                <strong>51</strong>
                <small>day streak</small>
              </div>

              <div className="leader-proof">
                ✓ 102 proofs
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

        <section className="final-cta">

          <div className="cta-icon">
            ♨
          </div>

          <h2>
            Your next 60 days start here.
          </h2>

          <p>
            Stop waiting to feel ready. Start building.
          </p>

          <button
            className="primary-btn"
            onClick={() => {
              if (currentUser) {
                goToChallenge();
              } else {
                openSignup();
              }
            }}
          >
            {currentUser
              ? "Start building"
              : "Join ABTalks"}

            <span>→</span>
          </button>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footer-brand">
          <div className="brand-icon">
            AB
          </div>

          <strong>
            ABTalks
          </strong>
        </div>

        <p>
          Build in public. Become visible.
        </p>

      </footer>


      {/* =========================
          LOGIN MODAL
      ========================= */}

      {showLogin && (

        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >

          <div
            className="auth-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <div className="auth-icon">
              👤
            </div>

            <h2>
              Welcome back
            </h2>

            <p>
              Log in to continue your ABTalks journey.
            </p>

            <form
              onSubmit={handleLogin}
              autoComplete="off"
            >

              <input
                type="email"
                name="abt-login-email"
                placeholder="yourgmail.com"
                value={loginData.email}
                autoComplete="off"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                name="abt-login-password"
                placeholder="Password"
                value={loginData.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                required
              />

              {loginError && (
                <div className="auth-error">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="primary-btn auth-submit"
              >
                Log in
                <span>→</span>
              </button>

            </form>

            <div className="auth-switch">
              Don't have an account?

              <button onClick={openSignup}>
                Sign up here
              </button>
            </div>

          </div>

        </div>

      )}


      {/* =========================
          SIGNUP MODAL
      ========================= */}

      {showSignup && (

        <div
          className="modal-overlay"
          onClick={() => setShowSignup(false)}
        >

          <div
            className="auth-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setShowSignup(false)}
            >
              ×
            </button>

            <div className="auth-icon">
              ✨
            </div>

            <h2>
              Create your account
            </h2>

            <p>
              Start your ABTalks journey today.
            </p>

            <form
              onSubmit={handleSignup}
              autoComplete="off"
            >

              <input
                type="text"
                name="abt-signup-name"
                placeholder="Full name"
                value={signupData.name}
                autoComplete="off"
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                name="abt-signup-email"
                placeholder="yourgmail.com"
                value={signupData.email}
                autoComplete="off"
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                name="abt-signup-password"
                placeholder="Create password"
                value={signupData.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    password: e.target.value,
                  })
                }
                required
              />

              {signupError && (
                <div className="auth-error">
                  {signupError}
                </div>
              )}

              <button
                type="submit"
                className="primary-btn auth-submit"
              >
                Sign up
                <span>→</span>
              </button>

            </form>

            <div className="auth-switch">
              Already have an account?

              <button onClick={openLogin}>
                Log in here
              </button>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;