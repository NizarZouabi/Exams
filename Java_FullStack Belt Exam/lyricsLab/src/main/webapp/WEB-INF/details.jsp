<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
<meta charset="ISO-8859-1">
<title>Song details</title>
</head>
<body class="bg-light">
   <div class="container">
    <div class="border border-bottom text-center">
    <h1 class="display-2"><c:out value="${song.title}"/></h1>
     <h2 class="lead text-secondary">(Started by <c:out value="${creator.firstName} ${creator.lastName}"/>)</h2>
     <h4 class="fw-bold"><c:out value="${song.genre}"/></h4>
     <h3 class="">Lyrics:</h3>
     <p><c:out value="${song.lyrics}"></c:out></p>
     <a class="btn btn-success mb-2" href="/songs/${song.id}/edit">Contribute</a>
     </div>
     <div>
       <h3 class="text-warning">Collaborators:</h3>
       <ul>
        <c:forEach var="user" items="${song.users}">
          <li class="text-secondary">${user.firstName} ${user.lastName}</li>
         </c:forEach>
       </ul>
       <a href="/dashboard">Cancel</a>
     </div>
   </div>
</body>
</html>