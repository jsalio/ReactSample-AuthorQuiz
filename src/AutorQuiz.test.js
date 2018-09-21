import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter});

const state = {
  turnData:{
    books:['1','2'],
    author:{
      name:'1',
      imageUrl:'1.png',
      imageSource:'xxxxx',
      books:['1']
    }
  },
  highlight:'none'
}

describe("Author Quiz",() => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSeleted={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  describe("When not answer has been seleted",()=>{
    let wrapper;
    beforeAll(() => {
      wrapper= mount(<AuthorQuiz {...state} onAnswerSeleted={() => {}}/>)
    });

    it("should have no background color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('')
    });
  });

  describe("When not answer has been seleted",()=>{
    let wrapper;
    beforeAll(() => {
      wrapper= mount(<AuthorQuiz {...(Object.assign({}, state,{highlight: 'wrong'}))} onAnswerSeleted={() => {}}/>)
    });

    it("should have no background color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red')
    });
  });

  describe("When correct answer has been seleted",()=>{
    let wrapper;
    beforeAll(() => {
      wrapper= mount(<AuthorQuiz {...(Object.assign({}, state,{highlight: 'correct'}))} onAnswerSeleted={() => {}}/>)
    });

    it("should have no background color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green')
    });
  });

  describe("When correct answer has been seleted",()=>{
    let wrapper;
    const handlerAnswerSeleted = jest.fn();
    beforeAll(() => {
      wrapper= mount(<AuthorQuiz {...state} onAnswerSeleted={handlerAnswerSeleted}/>)
      wrapper.find('.answer').first().simulate('click')
    });

    it("on seleted should be called", () => {
        expect(handlerAnswerSeleted).toHaveBeenCalled();
    });

    it("on seleted should be called with 1", () => {
      expect(handlerAnswerSeleted).toHaveBeenCalledWith('1');
  });
  });
});
