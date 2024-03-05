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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign up</title>
</head>
<body class="bg-dark">
    <div>
        <section class="text-center">
            <div class="p-5 bg-image" style="
                background-image: url('https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg');
                height: 300px;
                "></div>
        <div class="card mx-4 mx-md-5 shadow-5-strong" style="
                margin-top: -100px;
                background: hsla(0, 0%, 100%, 0.8);
                backdrop-filter: blur(30px);
                ">
            <div class="card-body py-5 px-md-5">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <h1 class="display-1 fw-bold text-danger">Lyrics Lab</h1>
                <h2 class="fw-bold mb-5 border-bottom pb-2 display-6">Sign up</h2>
                <form:form class="" action="/register" method="POST" modelAttribute="newUser">
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                                <form:label path="firstName" class="form-label" for="form3Example1">First name</form:label>
                                <form:input path="firstName" type="text" id="form3Example1" class="form-control" />
                                <form:errors class="text-danger" path="firstName"/>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                                <form:label path="lastName" class="form-label" for="form3Example2">Last name</form:label>
                                <form:input path="lastName" type="text" id="form3Example2" class="form-control" />
                                <form:errors class="text-danger" path="lastName" />
                            </div>
                        </div>
                    </div>

                    <div class="form-outline mb-4">
                        <form:label path="email" class="form-label" for="form3Example3">Email address</form:label>
                        <form:input path="email" type="email" id="form3Example3" class="form-control" />
                        <form:errors class="text-danger" path="email" />
                    </div>

                    <div class="form-outline mb-4">
                        <form:label path="password" class="form-label" for="form3Example4">Password</form:label>
                        <form:input path="password" type="password" id="form3Example4" class="form-control" />
                        <form:errors class="text-danger" path="password" />
                    </div>
                    <div class="form-outline mb-4">
                        <form:label path="confirmPass" class="form-label" for="form3Example4">Confirm Password</form:label>
                        <form:input path="confirmPass" type="password" id="form3Example4" class="form-control" />
                        <form:errors class="text-danger" path="confirmPass" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                        Register
                    </button>
                </form:form>
            </div>
            <div class="col-lg-8">
                <h2 class="fw-bold mb-5 border-bottom display-6">Connect</h2>
                <form:form class="" action="/login" method="POST" modelAttribute="newLogin">
                    <div class="form-outline mb-4">
                        <form:label path="email" class="form-label" for="form3Example3">Email address</form:label>
                        <form:input path="email" type="email" id="form3Example3" class="form-control" />
                        <form:errors class="text-danger" path="email" />
                    </div>
                
                    <div class="form-outline mb-4">
                        <form:label path="password" class="form-label" for="form3Example4">Password</form:label>
                        <form:input path="password" type="password" id="form3Example4" class="form-control" />
                        <form:errors class="text-danger" path="password" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                        Login
                    </button>
                </form:form>
            </div>
        </div>
    </div>
    </div>
    </section>
    </div>
</body>
</html>