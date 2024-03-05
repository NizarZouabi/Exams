<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
<meta charset="ISO-8859-1">
<title>Contribution</title>
</head>
<body class="bg-light">
   <div class="d-flex justify-content-center flex-column container-sm mt-5">
    <h1>Add to <c:out value="${song.title}"/></h1>
    <form:form class="form-control d-flex flex-column" action="/songs/${songId}/update" method="POST" modelAttribute="song">
     <input type="hidden" name="_method" value="put"/>
     <input type="hidden" name="creatorId" value="${song.creatorId}"/>
     <form:label path="title">Song Title:</form:label>
     <form:input path="title" type="text" placeholder="${song.title}"/>
     <form:errors class="text-danger" path="title"/>
     <form:label path="genre">Genre:</form:label>
     <form:input path="genre" type="text" placeholder="${song.genre}"/>
     <form:errors class="text-danger" path="genre"/>
     <form:label path="lyrics">Add your Lyrics:</form:label>
     <form:input path="lyrics" type="text" placeholder="${song.lyrics}"/>
     <form:errors class="text-danger" path="lyrics"/>
     ${song.lyrics}
     <button type="submit" class="btn btn-primary m-5">Submit</button>
    </form:form>
    
    <a href="/dashboard">Cancel</a>
    <c:if test="${song.creatorId eq userId}">
        <form action="/songs/${song.id}/delete/${song.creatorId}" method="POST">
          <input type="hidden" name="_method" value="delete"/>
          <button type="submit" class="btn btn-danger mt-3">Delete</button>
        </form>
    </c:if>
    </div>
</body>
</html>