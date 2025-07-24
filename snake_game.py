import pygame
import random
import os

# Initialize pygame
pygame.init()

# Set up full screen
info = pygame.display.Info()
WIDTH, HEIGHT = info.current_w, info.current_h
win = pygame.display.set_mode((WIDTH, HEIGHT), pygame.FULLSCREEN)
pygame.display.set_caption('Colorful Snake Game')

# Colors
BG_COLORS = [(255, 183, 3), (255, 99, 72), (72, 219, 251), (29, 209, 161), (255, 234, 167)]
FOOD_COLOR = (255, 0, 100)
SNAKE_HEAD_COLOR = (0, 200, 0)
SNAKE_BODY_COLORS = [(0, 200, 0), (0, 150, 0), (0, 255, 100), (0, 255, 200)]

# Snake settings
SNAKE_SIZE = 32
SPEED = 15

# Fonts
font = pygame.font.SysFont('Segoe UI', 36)

# Helper functions
def random_pos():
    return [random.randrange(0, WIDTH//SNAKE_SIZE) * SNAKE_SIZE,
            random.randrange(0, HEIGHT//SNAKE_SIZE) * SNAKE_SIZE]

def draw_background():
    grad = pygame.Surface((WIDTH, HEIGHT))
    for y in range(HEIGHT):
        color = BG_COLORS[y * len(BG_COLORS) // HEIGHT]
        pygame.draw.line(grad, color, (0, y), (WIDTH, y))
    win.blit(grad, (0, 0))

def main():
    clock = pygame.time.Clock()
    snake = [random_pos()]
    direction = (1, 0)
    food = random_pos()
    score = 0
    running = True
    grow = False
    snake_colors = [random.choice(SNAKE_BODY_COLORS) for _ in range(1000)]

    while running:
        clock.tick(SPEED)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                if event.key == pygame.K_UP and direction != (0, 1):
                    direction = (0, -1)
                if event.key == pygame.K_DOWN and direction != (0, -1):
                    direction = (0, 1)
                if event.key == pygame.K_LEFT and direction != (1, 0):
                    direction = (-1, 0)
                if event.key == pygame.K_RIGHT and direction != (-1, 0):
                    direction = (1, 0)

        # Move snake
        new_head = [snake[0][0] + direction[0]*SNAKE_SIZE, snake[0][1] + direction[1]*SNAKE_SIZE]
        if new_head[0] < 0 or new_head[0] >= WIDTH or new_head[1] < 0 or new_head[1] >= HEIGHT or new_head in snake:
            # Game over
            msg = font.render('Game Over! Press ESC to exit.', True, (255, 0, 0))
            win.blit(msg, (WIDTH//2 - msg.get_width()//2, HEIGHT//2 - msg.get_height()//2))
            pygame.display.update()
            pygame.time.wait(2000)
            return
        snake.insert(0, new_head)
        if new_head == food:
            score += 1
            food = random_pos()
            grow = True
        if not grow:
            snake.pop()
        grow = False

        # Draw everything
        draw_background()
        # Draw food
        pygame.draw.rect(win, FOOD_COLOR, (*food, SNAKE_SIZE, SNAKE_SIZE))
        # Draw snake
        for i, pos in enumerate(snake):
            if i == 0:
                pygame.draw.rect(win, SNAKE_HEAD_COLOR, (*pos, SNAKE_SIZE, SNAKE_SIZE), border_radius=8)
            else:
                pygame.draw.rect(win, snake_colors[i % len(snake_colors)], (*pos, SNAKE_SIZE, SNAKE_SIZE), border_radius=8)
        # Draw score
        score_text = font.render(f'Score: {score}', True, (0, 0, 0))
        win.blit(score_text, (20, 20))
        pygame.display.update()

if __name__ == '__main__':
    main()
    pygame.quit()
