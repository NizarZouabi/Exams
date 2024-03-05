<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
<meta charset="ISO-8859-1">
<title>Songs Lab</title>
</head>
<body class="bg-light">
   <div class="container mt-5">
     <div class="d-flex flew-row justify-content-between gap-5">
       <h1>Hello <c:out value="${firstName}"/> <c:out value="${lastName}"/></h1>
       <form:form action="/logout" method="POST"><button class="btn btn-secondary">Logout</button></form:form>
     </div>
     
     <div class="d-flex flex-column">
       <h1 class="text-danger">All Song Labs</h1>
       <table class="table table-striped shadow-sm text-center">
         <thead>
           <tr>
            <th>Song</th>
            <th>Genre</th>
            <th># of Collaborations</th>
           </tr>
         </thead>
         <tbody>
          <c:forEach var="song"  items="${songs}" >
           <tr>
            <td><a href="/songs/${song.id}">${song.title}</a></td>
            <td>${song.genre}</td>
            <td>${song.users.size()}</td>
           </tr>
           </c:forEach>
         </tbody>
       </table>
     </div>
     
     <a class="btn btn-info" href="/songs/new">New Song</a>
     
   </div>
</body>
</html>