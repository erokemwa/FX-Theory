from flask import Flask, render_template, url_for, request, jsonify, redirect

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    subject = request.form.get("subject", "").strip()
    message = request.form.get("message", "").strip()
    if not name or not email or not subject or not message:
        return jsonify({"status": "error", "message": "All fields are required."}), 400
    return jsonify({"status": "success", "message": "Thank you, {}. We'll be in touch!".format(name)})

@app.route("/newsletter", methods=["POST"])
def newsletter():
    email = request.form.get("email", "").strip()
    if not email or "@" not in email:
        return redirect("/")
    return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)