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

QuizGame.Templates.quiz = `
<div class="row">
    <div class="col-md-12">
    <form>

    </form>
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