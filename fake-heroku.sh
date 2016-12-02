if [ ! -d "venv" ]; then
    if hash virtualenv; then
        virtualenv venv
    else
        echo >&2 "I require virtualenv but it's not installed.  Aborting.";
        exit 1;
    fi
fi

# Kill any sessions that are still active
PROCESSES=`ps ax | grep '[p]ython app.py' | cut -d ' ' -f 1`
if [ ! -z "${PROCESSES}" ]; then
    echo "Killing: ${PROCESSES}";
    kill $PROCESSES;
fi


source venv/bin/activate
pip install -r requirements.txt
(python app.py 2>&1)
