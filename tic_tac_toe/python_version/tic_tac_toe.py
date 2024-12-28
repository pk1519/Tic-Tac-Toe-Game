def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * (len(board) * 2 - 1))


def check_winner(board):
    for row in board:
        if row.count(row[0]) == len(row) and row[0] != ' ':
            return row[0]
    for col in range(len(board)):
        if all(board[row][col] == board[0][col] and board[0][col] != ' ' for row in range(len(board))):
            return board[0][col]
    if all(board[i][i] == board[0][0] and board[0][0] != ' ' for i in range(len(board))):
        return board[0][0]
    if all(board[i][len(board)-i-1] == board[0][len(board)-1] and board[0][len(board)-1] != ' ' for i in range(len(board))):
        return board[0][len(board)-1]
    return None


def is_draw(board):
    return all(cell != ' ' for row in board for cell in row)


def main():
    size = int(input("Enter board size (e.g., 3 for 3x3): "))
    board = [[' ' for _ in range(size)] for _ in range(size)]
    current_player = 'X'

    while True:
        print_board(board)
        try:
            row, col = map(int, input(f"Player {current_player}, enter your move (row and column): ").split())
            if not (0 <= row < size and 0 <= col < size) or board[row][col] != ' ':
                print("Invalid move! Try again.")
                continue
        except ValueError:
            print("Please enter two valid numbers separated by a space.")
            continue

        board[row][col] = current_player
        winner = check_winner(board)
        if winner:
            print_board(board)
            print(f"Player {winner} wins!")
            break

        if is_draw(board):
            print_board(board)
            print("It's a draw!")
            break

        current_player = 'O' if current_player == 'X' else 'X'

    if input("Play again? (yes/no): ").lower().startswith('y'):
        main()


if __name__ == "__main__":
    main()
