import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  Container,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import {
  getTasks,
  createTask,
  patchTask,
  subscribe,
  subscribeToTaskPatched,
  subscribeToTaskCreated,
} from "../api";

import { Add } from "@material-ui/icons";

export default function ToDo() {
  const [tasks, setTasks] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [saving, setSaving] = useState(false);

  subscribeToTaskCreated(function (data) {
    const clonedTasks = [...tasks];
    clonedTasks.push(data);
    setTasks(clonedTasks);
  });

  subscribeToTaskPatched((data) => {
    const clonedTasks = [...tasks];
    const currentTask = clonedTasks.filter((t) => t._id === data._id)[0];
    const index = clonedTasks.indexOf(currentTask);
    clonedTasks[index] = data;
    setTasks(clonedTasks);
  });

  useEffect(() => {
    async function _getTasks() {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        alert(error);
      } finally {
      }
    }

    _getTasks();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">To Do's Update</Typography>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          marginTop: "30px",
        }}
      >
        <Card>
          <CardHeader
            title="My to do's"
            action={
              <Button
                onClick={() => {
                  setShowDialog(true);
                }}
                color="primary"
                variant="outlined"
                startIcon={<Add />}
              >
                Add Item
              </Button>
            }
          ></CardHeader>
          <CardContent>
            <List>
              {tasks.map((task, i) => {
                const isLast = i === tasks.length - 1;
                return (
                  <>
                    <ListItem key={task._id}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={task.checked}
                          disableRipple
                          onChange={(e) => {
                            try {
                              patchTask(task._id, {
                                checked: e.target.checked,
                              });
                            } catch (error) {}
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={task.text} />
                    </ListItem>
                    {!isLast && <Divider />}
                  </>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Container>

      <Dialog
        fullWidth
        open={showDialog}
        onClose={() => {
          setTaskText("");
        }}
      >
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Task title"
            type="text"
            fullWidth
            onChange={(e) => {
              setTaskText(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={saving}
            onClick={() => {
              setShowDialog(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={saving}
            color="primary"
            onClick={async () => {
              try {
                const newTask = createTask({
                  checked: false,
                  text: taskText,
                });

                setShowDialog(false);
              } catch (error) {}
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
