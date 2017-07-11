QuizGame.Templates.parachuter = `
<div class="row" style="overflow:scroll;">
    <div class="col-md-12">

    <div class="parachute-man" data-toggle="tooltip"></div>

    <h2 class="game-header">
    <span class="text-danger">P</span>
    <span class="text-primary">A</span>
    <span class="text-warning">R</span>
    <span class="text-info">A</span>
    <span class="text-success">C</span>
    <span class="text-danger">H</span>
    <span class="text-primary">U</span>
    <span class="text-warning">T</span>
    <span class="text-info">E</span>
    <span class="text-success">R</span>
    </h2>

    <div class="quiz col-md-4 col-md-offset-4">
    question
    </div>


    </div>
    </div>
`;

QuizGame.Templates.login = `
<form class="form-horizontal">
    <div class="form-group">
    <label for="inputEmail" class="col-sm-3 control-label text-success">Email</label>
    <div class="col-sm-9">
    <input type="email" class="form-control input-email" id="inputEmail3" placeholder="Email">
    </div>
    </div>
    <div class="form-group">
    <label for="inputPassword3" class="col-sm-3 control-label text-warning">Password</label>
    <div class="col-sm-9">
    <input type="password" class="form-control input-password" id="inputPassword3" placeholder="Password">
    </div>
    </div>
    <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
    <div class="checkbox">
    <label>
    <input type="checkbox" class="input-remember-me"> Remember me
</label>
</div>
</div>
</div>
<div class="form-group">
    <div class="col-sm-12 text-center">
    <button type="submit" class="btn btn-primary btn-submit">Sign in</button>
    </div>
    </div>
<div class="form-group">
    <div class="col-sm-12 text-center">
    <span class="help-block"><a href="#demo" class="text-info">Continue as guest</a></span>
    </div>
</div>
    </form>
`;

QuizGame.Templates.quiz = `
<div class="quiz-content">

    <div class="row">
    <div class="col-md-12">
    <form>

    </form>
    </div>
    </div>

    <br />

    <div class="row">
    <div class="col-md-12 quiz-buttons">

    <div class="row">
    <div class="col-md-8 quiz-level-buttons">
    <button type="button" class="btn btn-info btn-level-down"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> EASIER</button>
    <button type="button" class="btn btn-warning btn-level-up"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> HARDER</button>
    </div>

    <div class="col-md-4 text-right">
    <button type="button" class="btn btn-success btn-reset"><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span> RESET</button>
    </div>
    </div>

    </div>
    </div>

    </div>
`;

QuizGame.Templates.question = `
<div class="form-group row <%= classes %>" id="question<%= index %>" data-index="<%= index %>">
    <% if (correct) { %>
        <label class="col-sm-12 col-form-label text-center"><%= expression %></label>
    <% }else{ %>
        <label for="question1" class="col-sm-6 col-form-label text-right"><%= expression %></label>
        <div class="col-sm-3">
        <input type="number" class="form-control question-input" maxlength="2" />
        </div>
        </div>
    <% } %>
`;