# rn-tomato-timer
React, Redux로 타이머 앱 만들기(일시정지 버튼 추가)

링크 : https://youtu.be/61t66d3cZHo
***
## Screenshots
![default](https://user-images.githubusercontent.com/45552388/63754671-3b0e2600-c8f0-11e9-9790-4689b11a1be6.png)
![stop](https://user-images.githubusercontent.com/45552388/63754759-60029900-c8f0-11e9-93da-d8c31d6b4904.png)

## Redux Theory
### Redux란?
- 리덕스는 리액트를 위한 state management 툴
(리덕스는 리액트만을 위해 만들어진 것이 아니다. 거의 모든 언어와 함께 쓰일 수 있다.)

### Why Redux?
- 컴포넌트는 local state를 가지고 있지만 앱은 global state를 갖고 있다.

    Local State 
    ```
    ex) 인스타그램 사진이 하트를 만들 때
    하나는 좋아요를 눌렀을때(하트가 빨간색)
    좋아요를 안눌렀을때 (회색)
    ```
    Global State 
    ```
    ex) 유저가 로그인을 했느냐 안했느냐 여부
    ```
    -> global state에서는 모든 컴포넌트가 영향을 받는다

- 때떄로 state는 공유되어야만 한다
    모든 컴포넌트들이 로그인 여부를 알아야 다르게 반응하기 때문
- 리덕스의 역할 = global shared state를 저장하는 것 = state container

정리)
앱은 수많은 컴포넌트들로 구성되어 있고 공유해야하는 state가 필요할때가 있다. 이 때 공유된 state를 저장하기 위해 리덕스를 사용한다.

### Stuff to remember
- 앱의 전체 state는 object로 저장된다(redux store = object)
- object의 데이터를 수정하는 방법은 action을 reducer로 보내면 가능
- action을 보내면 reducer가 state(store)를 변경해준다
- Action Creators는 actions을 만드는 함수들이다.
- Actions = Objects

### Redux 설치
```
npm install redux react-redux --save #or
yarn add redux react-redux
```

***
## Implementing Redux in Our App
### reducer 작성 요령
// Import
1) Actions
2) Action Creators
3) Reducer 
4) Export Action Creators
5) Export Reducer

### Connecting the Components to State 
#### provider(App.js)
```
import Timer from './components/Timer';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Timer />
    </Provider>
  );
}
```
provider의 역할은 store를 복사해서 children 컴포넌트에 넣는 것

#### Timer폴더 설명
- Timer > index.js, presenter.js
- index.js : container기능 / state, redux 작업 o

    - connect : 나의 컴포넌트를 store에 연결하는 것을 도와준다

    ```
    // Provider가 제공한 store에서 state을 복사해서 presenter의 props에 넘겨준다
    import { connect } from 'react-redux';
    import Timer from './presenter';

    function mapStateToProps(state){
        const { isPlaying, elapsedTime, timeDuration } = state;
        
        return {
            isPlaying,
            elapsedTime,
            timeDuration
        };
    }

    export default connect(mapStateToProps)(Timer);
    ```
    (presenter.js에서 console.log(this.props)를 해주면 연결된 state값이 출력됨)

- presenter.js : 데이터를 보여주기만 하면 됨 / state. redux 작업 x

    ```
    { !isPlaying && <Button iconName="play-circle" onPress= { () => { alert('play 버튼 클릭됨') } } /> }
    ```
    !isPlaying이 true이면(isPlaying이 false이면) <Button>을 return하고, 아니면 !isPlaying을 return(false return)

    참고: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators

### Connecting the Components to Actions
* dispatch는 action을 reducer로 보내는 function이다.
  
  -> 상태값을 수정 할 때 사용

* bindActionCreators : 값이 action creators인 객체를 같은 key를 가진 object로 변환

dispatch와 action을 binding하기(Timer/index.js)
```
...
import { bindActionCreators } from 'redux';
import { actionCreators as tomatoActions } from '../../reducer';

...
function mapDispatchToProps(dispatch){
    return {
        start: bindActionCreators(tomatoActions.startTimer, dispatch),
        restart: bindActionCreators(tomatoActions.restartTimer, dispatch)
    }
}

export default connect(mapDispatchToProps)(Timer);
```

bindActionCreators는 다음과 같이도 사용 가능(store는 App.js에 있음)
```
bindActionCreators(tomatoActions.startTimer, dispatch)

<=> store.dispatch(tomatoActions.startTimer())
```

### Adding seconds to the counter
컴포넌트의 Lifecycle Method **ComponentWillReceiveProps(newProps)**

컴포넌트가 새로운 prop을 받을때 불려진다. React는 props가 아직 변경되지 않았는데도 호출하므로 newPorps와 this.props을 확실하게 비교해야한다.

```
componentWillReceiveProps(newProps){
        const beforeProps = this.props;
        console.log(`플레이 버튼 누르기 전의 isPlaying: ${beforeProps.isPlaying}, 
        스탑버튼 누른 후의 isPlaying: ${newProps.isPlaying}`);
}
```
-> beforeProps에서는 변하기 전의 isPlaying 값이 반환되고 newProps의 isPlaying은 현재 state(바뀐 state)값이 반환된다.






