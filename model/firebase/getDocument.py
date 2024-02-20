from firestore import db


def getAllDocuments(collection):
    docs = db.collection(collection).stream()
    return docs


def getDocument(collection, docId):
    doc = db.collection(collection).document(docId).get()
    return doc


def updateDocument(collection, docId, data):
    db.collection(collection).document(docId).update(data)
    return True


def deleteDocument(collection, docId):
    db.collection(collection).document(docId).delete()
    return True
