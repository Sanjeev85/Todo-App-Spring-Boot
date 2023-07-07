package com.example.todo_manager.controller;

import com.example.todo_manager.entities.Todo;
import com.example.todo_manager.exception.GlobalException;
import com.example.todo_manager.repository.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/slash")
    public String slash() {
        return "Stringer Data";
    }


    @GetMapping
    public List<Todo> getAllNotes() {
        logger.info(String.format("Called From getAllNotes"));
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {

        logger.info(String.format("Called from createTodo"));
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}/text")
    public Todo updateTodoText(@PathVariable Long id, @RequestBody Todo received) {

        logger.info(String.format("Called from updateTodoText"));

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Todo not found with id: " + id));

        todo.setTitle(received.getTitle());

        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodoStatus(@PathVariable Long id, @RequestParam("completed") boolean completed) {
        logger.info("Entered inside Update" + id + " completed " + completed);

//        System.out.println("Entered inside Update" + id + " completed " + completed);
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Todo not found with id: " + id));

        todo.setCompleted(completed);

        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable long id) {
        logger.info("Delete Request");
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Todo not found with id: " + id));

        todoRepository.delete(todo);
    }
}
