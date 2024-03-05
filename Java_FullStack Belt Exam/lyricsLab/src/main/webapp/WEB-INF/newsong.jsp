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
<title>Add Song</title>
</head>
<body class="bg-light">
   <div class="d-flex justify-content-center flex-column container-sm mt-5">
   <h1>Start a new Song!</h1>
   <form:form class="form-control d-flex flex-column" action="/songs/create" method="POST" modelAttribute="song">
   <input type="hidden" name="creatorId" value="${userId}"/>
     <form:label path="title">Song Title:</form:label>
     <form:input path="title" type="text"/>
     <form:errors class="text-danger" path="title"/>
     <form:label path="genre">Genre:</form:label>
     <form:input path="genre" type="text"/>
     <form:errors class="text-danger" path="genre"/>
     <form:label path="lyrics">Add your lyrics:</form:label>
     <form:input path="lyrics" type="text"/>
     <form:errors class="text-danger" path="lyrics"/>
     <button type="submit" class="btn btn-primary m-5">Submit</button>
   </form:form>
   <a href="/dashboard">Cancel</a>
   </div>

</body>
</html>