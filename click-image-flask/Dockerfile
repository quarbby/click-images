FROM python:3.6

RUN pip install requests
RUN pip install flask_cors
RUN pip install neo4j
RUN pip install elasticsearch

WORKDIR /usr/src/app

EXPOSE 5000

ENTRYPOINT ["python"]

CMD ["server.py"]
