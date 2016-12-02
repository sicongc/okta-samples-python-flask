if [ ! -d "venv" ]; then
    if hash virtualenv; then
        virtualenv venv
    else
        echo >&2 "I require virtualenv but it's not installed.  ";
        echo >&2 "Install virtualenv with: '$ pip install virtualenv'";
        echo >&2 "Aborting.";
        exit 1;
    fi
fi

source venv/bin/activate
pip install -r requirements.txt
(python app.py 2>&1)
