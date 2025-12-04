from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buy')
@app.route('/cars')
def buy():
    return render_template('buy.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/financing')
def financing():
    return render_template('financing.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/caraudit')
def caraudit():
    return render_template('caraudit.html')

@app.route('/delivery')
def delivery():
    return render_template('delivery.html')

@app.route('/warranty')
def warranty():
    return render_template('warranty.html')

@app.route('/electric-hybrid')
def electric_hybrid():
    return render_template('electric-hybrid.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/saved-searches')
def saved_searches():
    return render_template('saved-searches.html')

@app.route('/last-searches')
def last_searches():
    return render_template('last-searches.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')

@app.route('/data-settings')
def data_settings():
    return render_template('data-settings.html')

@app.route('/demo')
def demo():
    return render_template('demo.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

