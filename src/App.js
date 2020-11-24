import React,{ useEffect, useState} from 'react'
import { BehaviorSubject } from "rxjs";
import { map, switchMap, scan } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

import List from './components/List'

function fetchNames(numOfResults) {
  const api = `https://randomuser.me/api/?results=${numOfResults}&seed=rx-react&nat=IR&inc=name&noinfo`;
  return ajax
    .getJSON(api)
    .pipe(
      map(({ results: users }) =>
        users.map(user => `${user.name.first} ${user.name.last}`)
      )
    );
}

const names$ = new BehaviorSubject().pipe(
  scan(acc => 3 + acc, 0),
  switchMap(fetchNames)
);


const useObservable = observable => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => {
      sub.unsubscribe();
    };
  }, [observable]);
  return state;

}

const App = () => {
  const names = useObservable(names$)

  return (
    <div className="App">
      <h3 dir="ltr" style={{ display:"flex", justifyContent:"center"}}> React with RxJS </h3>
      <List items={names}/>
      <button className="button" onClick={() => names$.next()}>اطلاعات بیشتر</button>
    </div>
  )
}

export default App
