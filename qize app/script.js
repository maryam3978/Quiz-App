// ===== QUIZ DATA ===== 
        // 10 Computer General Knowledge Questions
        const quizData = [
            {
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Processor Utility"],
                correct: 0
            },
            {
                question: "Which of the following is NOT a programming language?",
                options: ["Python", "Java", "HTML", "C++"],
                correct: 2
            },
            {
                question: "What is the full form of RAM?",
                options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Run Access Memory"],
                correct: 0
            },
            {
                question: "Which company developed the Windows operating system?",
                options: ["Apple", "Microsoft", "Google", "Linux Foundation"],
                correct: 1
            },
            {
                question: "What does URL stand for?",
                options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Retrieval Location", "Universal Resource Locator"],
                correct: 0
            },
            {
                question: "Which of the following is a type of computer memory?",
                options: ["SSD", "RAM", "ROM", "All of the above"],
                correct: 3
            },
            {
                question: "What is the smallest unit of data in a computer?",
                options: ["Byte", "Kilobyte", "Bit", "Megabyte"],
                correct: 2
            },
            {
                question: "Which protocol is used for secure web communication?",
                options: ["HTTP", "FTP", "HTTPS", "SMTP"],
                correct: 2
            },
            {
                question: "What does GPU stand for?",
                options: ["Graphics Processing Unit", "General Purpose Unit", "Graphics Program Utility", "General Processing Unit"],
                correct: 0
            },
            {
                question: "Which of the following is a database management system?",
                options: ["MySQL", "Python", "JavaScript", "CSS"],
                correct: 0
            }
        ];

        // ===== STATE VARIABLES =====
        let currentQuestion = 0;
        let score = 0;
        let selectedAnswers = new Array(quizData.length).fill(null);
        let timeRemaining = 15 * 60; // 15 minutes in seconds
        let timerInterval = null;
        let quizSubmitted = false;
        let autoSubmitted = false;

        // ===== INITIALIZE QUIZ =====
        function startQuiz() {
            // Hide welcome screen, show quiz screen
            document.getElementById('welcomeScreen').classList.add('hidden');
            document.getElementById('quizScreen').classList.remove('hidden');
            document.getElementById('totalQuestions').textContent = quizData.length;

            // Start timer
            startTimer();

            // Display first question
            displayQuestion();
        }

        // ===== TIMER FUNCTION =====
        function startTimer() {
            timerInterval = setInterval(() => {
                timeRemaining--;

                // Update timer display
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                const timerDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                document.getElementById('timer').textContent = timerDisplay;

                // Add warning class when time is running out (less than 2 minutes)
                if (timeRemaining <= 120) {
                    document.getElementById('timer').classList.add('warning');
                }

                // Auto-submit when time is up
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    autoSubmitted = true;
                    submitQuiz();
                }
            }, 1000);
        }

        // ===== DISPLAY QUESTION =====
        function displayQuestion() {
            const question = quizData[currentQuestion];

            // Update question text
            document.getElementById('questionText').textContent = question.question;

            // Update question counter
            document.getElementById('currentQuestion').textContent = currentQuestion + 1;

            // Update progress bar
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';

            // Display options
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';

            question.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option';
                optionBtn.textContent = option;

                // Highlight if already selected
                if (selectedAnswers[currentQuestion] === index) {
                    optionBtn.classList.add('selected');
                }

                optionBtn.onclick = () => selectOption(index);
                optionsContainer.appendChild(optionBtn);
            });

            // Update navigation buttons
            updateNavigationButtons();
        }

        // ===== SELECT OPTION =====
        function selectOption(index) {
            selectedAnswers[currentQuestion] = index;

            // Update UI
            const options = document.querySelectorAll('.option');
            options.forEach((opt, i) => {
                opt.classList.remove('selected');
                if (i === index) {
                    opt.classList.add('selected');
                }
            });
        }

        // ===== NAVIGATION =====
        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        }

        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                displayQuestion();
            }
        }

        function updateNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');

            // Disable previous button on first question
            prevBtn.disabled = currentQuestion === 0;

            // Show submit button on last question
            if (currentQuestion === quizData.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }

        // ===== SUBMIT QUIZ =====
        function submitQuiz() {
            // Stop timer
            clearInterval(timerInterval);

            // Calculate score
            score = 0;
            selectedAnswers.forEach((answer, index) => {
                if (answer === quizData[index].correct) {
                    score++;
                }
            });

            // Hide quiz screen, show result screen
            document.getElementById('quizScreen').classList.add('hidden');
            document.getElementById('resultScreen').classList.remove('hidden');

            // Display result
            displayResult();

            // Create confetti if passed
            if (score >= 8) {
                createConfetti();
            }
        }

        // ===== DISPLAY RESULT =====
        function displayResult() {
            const percentage = Math.round((score / quizData.length) * 100);
            const resultIcon = document.getElementById('resultIcon');
            const resultTitle = document.getElementById('resultTitle');
            const resultMessage = document.getElementById('resultMessage');
            const scoreNumber = document.getElementById('scoreNumber');

            scoreNumber.textContent = `${score}/${quizData.length}`;

            if (score >= 8) {
                resultIcon.textContent = '🎉';
                resultTitle.textContent = 'Congratulations! You Passed!';
                resultMessage.textContent = `Amazing! You scored ${percentage}% on the Computer Knowledge Quiz. Great job! 🌟`;
            } else {
                resultIcon.textContent = '😊';
                resultTitle.textContent = 'Thank You for Trying!';
                resultMessage.textContent = `You scored ${percentage}% on the Computer Knowledge Quiz. Don't worry, you can try again and improve! 💪`;
            }

            // Add auto-submitted message if applicable
            if (autoSubmitted) {
                resultMessage.textContent += '\n\n⏱ Time\'s up! Your quiz was auto-submitted.';
            }
        }

        // ===== CONFETTI ANIMATION =====
        function createConfetti() {
            const confettiCount = 50;
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = ['#ff9ec9', '#ffc0e3', '#b3d9ff', '#a8e6cf', '#ffe0b3'][Math.floor(Math.random() * 5)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => confetti.remove(), 3500);
            }
        }

        // ===== RETRY QUIZ =====
        function retryQuiz() {
            // Reset variables
            currentQuestion = 0;
            score = 0;
            selectedAnswers = new Array(quizData.length).fill(null);
            timeRemaining = 15 * 60;
            quizSubmitted = false;
            autoSubmitted = false;

            // Hide result screen, show welcome screen
            document.getElementById('resultScreen').classList.add('hidden');
            document.getElementById('welcomeScreen').classList.remove('hidden');

            // Reset timer display
            document.getElementById('timer').classList.remove('warning');
            document.getElementById('timer').textContent = '15:00';
        }

        // ===== CLOSE QUIZ =====
        function closeQuiz() {
            // Reset and show welcome screen
            retryQuiz();
        }