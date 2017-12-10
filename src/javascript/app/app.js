class App {
    constructor() {
        console.log('App initialized');
        const foo = 'bar';
        this.someMethod(foo);
    }
    someMethod(val) {
        console.log('foo:', val);
    }
}

export default App;
