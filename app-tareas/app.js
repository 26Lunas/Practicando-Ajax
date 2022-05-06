$(function() {
    console.log('Jquery esta funcionando');
    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function(e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                type: "POST",
                url: "task-search.php",
                data: { search: search },
                success: function(response) {
                    let task = JSON.parse(response);
                    let plantilla = '';

                    task.forEach(task => {
                        plantilla += `<li>
                        ${task.name}
                    </li>`
                    });

                    $('#container').html(plantilla);
                    $('#task-result').show();
                }
            });
        }

    });

    $('#task-form').submit(function(e) {
        e.preventDefault();
        const postDate = {
            name: $('#task-name').val(),
            description: $('#task-description').val()
        };

        $.post('task-add.php', postDate, function(response) {
            fetchTasks();
            $('#task-form').trigger('reset');
        })

    });



    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response) {
                let tasks = JSON.parse(response);

                let plantilla = '';
                tasks.forEach(tasks => {
                    plantilla +=
                        `<tr taskId=${tasks.id}>
                        <td>${tasks.id}</td>
                        <td>${tasks.name}</td>
                        <td>${tasks.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger" >
                                Delete
                            </button>
                        </td>
                    </tr>`
                });

                $('#task').html(plantilla);
            }
        });
    }

    $(document).on('click', '.task-delete', function() {
        if (confirm("Estas seguro de querer eliminar?")) {
            let elemet = $(this)[0].parentElement.parentElement;
            let id = $(elemet).attr('taskId');

            $.post('task-delete.php', { id }, function(response) {
                fetchTasks();
            });
        }
    });

});