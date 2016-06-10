class App {
    constructor() {
        console.log('App initialized');
        this.foo = 'bar';
        this.someMethod(this.foo);
    }
    someMethod(val) {
        console.log('foo:', val);
    }
}

export default App;
