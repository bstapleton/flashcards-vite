import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    home: 'Home',
                    learn: 'Learn',
                    import: 'Import some questions',
                    login: 'Login',
                    profile: 'Profile',
                    history: 'History',
                    register: 'Register',
                    create_questions: 'Create some questions',
                    logout: 'Logout',
                    hello: 'Hello',
                    correctness: 'Correctness',
                    correctness_matrix: {
                        complete: 'Completely correct',
                        partial: 'Partially correct',
                        none: 'Incorrect',
                    },
                    your_scorecard: 'Your scorecard',
                    total_points: 'Total points',
                    type: 'Type',
                    question: 'Question',
                    types: {
                        multiple: 'One or more correct answers',
                        single: 'Single correct answer',
                        statement: 'Statement',
                    },
                    score: 'Score',
                    difficulty: 'Difficulty',
                    difficulty_when_answered: 'Difficulty when answered',
                    new_difficulty: 'New difficulty',
                    earliest_you_will_see_this_question_again: 'Earliest you will see this question again',
                    easy: 'Easy',
                    medium: 'Medium',
                    hard: 'Hard',
                    buried: 'Buried',
                    correct_selection: 'Correct selection',
                    incorrect_selection: 'Incorrect selection',
                    correct_but_not_selected: 'Correct but not selected',
                    previous_attempt: 'Previous attempt',
                    at: 'At',
                    next_question: 'Next question',
                    not_registered: 'Not yet registered?',
                    register_here: 'Register here',
                    username: 'Username',
                    username_hint: 'This is unique to you. Do not use your email address.',
                    password: 'Password',
                    password_hint: 'Do not use a password you have used elsewhere. To help with this, we strongly recommend a password manager.',
                    password_confirmation: 'Password confirmation',
                    email: 'Email',
                    display_name: 'Display name',
                    display_name_hint: 'This should be different from your username, since it will protect you from bad actors. Your display name will be used when sharing your progress with others, or when engaging in team-based learning (when the feature eventually gets added).',
                    description: 'Description',
                    true: 'True',
                    false: 'False',
                    submit_answer: 'Submit your answer',
                    successful_registration: 'Successful registration',
                    click_to_login: 'Click here to login',
                    loading: 'Loading, please wait...',
                    scorecard: 'Your scorecard',
                    history_description: 'The data displayed here is correct as of the time you submitted your answer/s. Since both question and answer data can be changed by yourself at any time, this reflects your progress more accurately.',
                    errors: {
                        password_mismatch: 'Passwords do not match'
                    },
                    features: {
                        review: 'Review your learning attempts and scoring',
                        import: 'Import pre-defined question packs to get you started',
                        trial: 'As a trial account, you can do the following:',
                        advanced: 'As an advanced user, you can do the following:',
                    },
                    trial_features: {
                        limit: 'Create up to 20 questions',
                        learn: 'Learn using your questions for a month after you first registered',
                    },
                    advanced_features: {
                        limit: 'Create an unlimited number of questions',
                        learn: 'Learn using your questions for as long as you want while your account is active',
                        configure_timers: 'Configure timers for your easy/medium/hard difficulties',
                        export_attempts: 'Export all of your attempt data to CSV (Excel-compatible) format',
                        export_json: 'Export all of your questions to JSON format in case you want to use it elsewhere'
                    },
                    after_trial_ends: 'After your trial ends, your account will become read-only. You\'ll no longer be able to create new questions (even if you didn\'t use up your 20 question limit) or make attempts to answer the questions you have. Upgrading will get you the following additional features:',
                    import_intro: 'Here there are packs 10 questions you can import for your account and try answering. This app works best when you tailor its resources for your own use case, but we know it can be a bit of a chore to sit down and author questions and answers through a form, so to give you a taster of how the app works, this resource is provided for you.',
                    import_stats: 'You currently have {{count}} questions, and {{remaining}} remaining for your trial account.',
                    import_zero_remaining: 'Because you have 0 remaining questions, you will need to delete some, or upgrade your account before the import process will work.',
                    import_instructions: 'Just click on one of the topics to import {{actualRemaining}} questions around that subject.',
                    import_topics: {
                        dogs: 'Dogs',
                        literature: 'Literature',
                        physics: 'Physics',
                    },
                    number_of_questions: 'Your total questions',
                    import_count: 'Number imported',
                    remaining_count: 'Trial account questions remaining',
                    close: 'Close',
                    results: 'Results',
                    select: {
                        initial_state: 'Select an option',
                        options: {
                            orange: 'Orange',
                            yellow: 'Yellow',
                            green: 'Green',
                            teal: 'Teal',
                            cyan: 'Cyan',
                            blue: 'Blue',
                            indigo: 'Indigo',
                            purple: 'Purple',
                            pink: 'Pink',
                            red: 'Red'
                        }
                    },
                    select_a_colour: 'Select a colour',
                    select_a_colour_hint: 'Selecting a colour for the tag will help visually differentiate between the topics you set up.'
                }
            },
        }
    });

export default i18n;