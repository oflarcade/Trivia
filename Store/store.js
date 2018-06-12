import { createStore } from 'redux'
import { Animated, Easing } from 'react-native';





const defaultState = {
    levelNbr: 1,
    levelName: '',
    questionNbr: 1,
    questionName: '',
    levelOne: false,
    levelTwo: true,
    levelThree: true,
    levelFour: true,
    levelFive: true,
    levelSix: true,
    levelSeven: true,
    questionOne: false,
    questionTwo: true,
    questionThree: true,
    questionFour: true,
    questionFive: true,
    questionSix: true,
    questionSeven: true,
    questionEight: true,
    questionNine: true,
    questionTen: true,
    questionText: '',
    correctResponse: '',
    firstResponse: '',
    secondResponse: '',
    thirdResponse: '',
    fourthResponse: '',
    selected: '',
    score: 0,
    questionUnlocked: 0,
    levelOneQ:  'باب الصلاة',
    levelTwoQ: 'باب الريان',
    levelThreeQ: ' باب الصدقة ',
    levelFourQ: 'باب الحج',
    levelFiveQ: 'باب التوبة',
    levelSixQ: 'باب الصيام',
    levelSevenQ: 'باب الجهاد',
    levelOneQT: 'باب السورة',
    levelTwoQT: 'باب الذكر',
    levelThreeQT: 'باب القائل',
    levelFourQT: 'باب النساء',
    levelFiveQT: 'باب المعاني في القرآن 1',
    levelSixQT: 'باب المعاني في القرآن 2',
    levelSevenQT: 'باب المتشابهات',
    recentlyUnlocked: 1,
    visible :false,
    difficulty: 'easy',
    

    
}


function triviaStore(state = defaultState, action ={}) {
    switch (action.type) {
        case 'LOAD_STORE':
            return {
                ...state,
                score: action.score,
                levelName: action.levelName,
                levelNbr: action.levelNbr,
                questionNbr: action.questionNbr,
                questionName: action.questionName,
                levelOne: action.levelOne,
                levelTwo: action.levelTwo,
                levelThree: action.levelThree,
                levelFour: action.levelFour,
                levelFive: action.levelFive,
                levelSix: action.levelSix,
                levelSeven: action.levelSeven,
                questionOne: action.questionOne,
                questionTwo: action.questionTwo,
                questionThree: action.questionThree,
                questionFour: action.questionFour,
                questionFive: action.questionFive,
                questionSix: action.questionSix,
                questionSeven: action.questionSeven,
                questionEight: action.questionEight,
                questionNine: action.questionNine,
                questionTen: action.questionTen,
                questionUnlocked: action.levelOneQ,
              

            }
        case 'RESET':
            return{
                ...state,
                levelNbr: 1,
                levelName: '',
                questionNbr: 1,
                questionName: '',
                levelOne: false,
                levelTwo: true,
                levelThree: true,
                levelFour: true,
                levelFive: true,
                levelSix: true,
                levelSeven: true,
                questionOne: false,
                questionTwo: true,
                questionThree: true,
                questionFour: true,
                questionFive: true,
                questionSix: true,
                questionSeven: true,
                questionEight: true,
                questionNine: true,
                questionTen: true,

                questionOneR: false,
                questionTwoR: true,
                questionThreeR: true,
                questionFourR: true,
                questionFiveR: true,
                questionSixR: true,
                questionSevenR: true,
                questionEightR: true,
                questionNineR: true,
                questionTenR: true,

                questionText: '',
                correctResponse: '',
                firstResponse: '',
                secondResponse: '',
                thirdResponse: '',
                fourthResponse: '',
                selected: '',
                score: 0,
                questionUnlocked: 0,
               
    
            }
        case 'LOAD_QUESTION_STATUS':
            return {
                ...state,
                questionOne: action.questionOne,
                questionTwo: action.questionTwo,
                questionThree: action.questionThree,
                questionFour: action.questionFour,
                questionFive: action.questionFive,
                questionSix: action.questionSix,
                questionSeven: action.questionSeven,
                questionEight: action.questionEight,
                questionNine: action.questionNine,
                questionTen: action.questionTen,
                recentlyUnlocked: state.questionNbr,
            }
        case 'SOLVED':
            return { 
                ...state,
                 questionUnlocked : state.questionUnlocked + 1
            }
         case 'SCOREBEFORE':
                return {
                    ...state,
                    score: state.score + 1,
                }   
        case 'SCORE':
          return { 
              ...state,
               score: state.score + 10,
               recentlyUnlocked: state.recentlyUnlocked + 1               
            }
        case 'LOAD_LEVEL':
            return {
                ...state,
                levelName: action.text,
                levelNbr: action.id
            }
        case 'LOAD_QUESTION':
            return {
                ...state,
                questionName: action.text,
                questionNbr: action.id
            }
        case 'LOAD_GAME_DATA':

            return {
                ...state,
                questionText: action.qtext,
                correctResponse: action.correct,
                firstResponse: action.ansOne,
                secondResponse: action.ansTwo,
                thirdResponse: action.ansThree,
                fourthResponse: action.ansFour
            };
        case 'UNLOCKQ2':
            return {
                ...state,
                questionTwo: false,
            };
        case 'UNLOCKQ3':
            return {
                ...state,
                questionThree: false,
            };
        case 'UNLOCKQ4':
            return {
                ...state,
                questionFour: false,
            };
        case 'UNLOCKQ5':
            return {
                ...state,
                questionFive: false,
            };
        case 'UNLOCKQ6':
            return {
                ...state,
                questionSix: false,
            };
        case 'UNLOCKQ7':
            return {
                ...state,
                questionSeven: false,
            };
        case 'UNLOCKQ8':
            return {
                ...state,
                questionEight: false,
            };
        case 'UNLOCKQ9':
            return {
                ...state,
                questionNine: false,
            };
        case 'UNLOCKQ10':
            return {
                ...state,
                questionTen: false,
            };
        case 'SELECTED':
            return {
                ...state,
                selected: action.text
            };
        case 'UNLOCKL2': {
            return {
                ...state,
                levelTwo: false,
            };
        }
        case 'UNLOCKL3': {
            return {
                ...state,
                levelThree: false,
            };
        }
        case 'UNLOCKL4': {
            return {
                ...state,
                levelFour: false,
            };
        }
        case 'UNLOCKL5': {
            return {
                ...state,
                levelFive: false,
            };
        }
        case 'UNLOCKL6': {
            return {
                ...state,
                levelSix: false,
            };
        }
        case 'UNLOCKL7': {
            return {
                ...state,
                levelSeven: false,
            };
        }
        case 'LOCKQUESTIONS': {
            return {
                ...state,
                questionTwo: true,
                questionThree: true,
                questionFour: true,
                questionFive: true,
                questionSix: true,
                questionSeven: true,
                questionEight: true,
                questionNine: true,
                questionTen: true,
            }
        }
        case 'GOLEVEL': {
            return {
                ...state,
                golevel: true,
            }
        }
        case 'GONOLEVEL': {
            return {
                ...state,
                golevel: false
            }
        }
        case 'ISSOLVED':{
            return {
                ...state,
                isSolved: action.solved,
            }
        }
        case 'INITIALSOLVED':{
            return{
                ...state,
                isSolved: false,
            }
        }
        case 'CHANGE_DIFFICULTY':
            return {
                ...state,
                difficulty: action.selected,
            }
        default:
            return state
    }

}

export default createStore(triviaStore)