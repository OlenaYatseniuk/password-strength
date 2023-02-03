import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})

export class PasswordStrengthComponent {
  inputValue = '';
  color = ''
  passwordStrength = ''
  message = ''

  colors = {
      'invalid': 'rgb(208, 201, 201)',
      'weak': 'rgb(218, 79, 79)',
      'easy': 'rgb(218, 79, 79)',
      'medium': 'rgb(240, 231, 59)',
      'strong': 'rgb(58, 185, 58)',
    }

  handleChange(event: any): void {
    this.inputValue = event.target.value;
    const strength = this.checkStrength(this.inputValue);
    this.color = (this.colors as any)[strength];
    this.passwordStrength = strength;
  }

  checkStrength(password: string): string {
    const specialCharacters = /[$-/:-?{~!"^_#@`\[\]]+/;
    const digits = /[0-9]+/;
    const letters = /[A-Za-z]+/;

    const hasLetters = letters.test(password);
    const hasDigits = digits.test(password);
    const hasCharacters = specialCharacters.test(password);

    if (password.length === 0) {
      this.message = ''
      return "invalid";
    }

    if (password && password.length < 8) {
      this.message = 'Your password is less than 8 symbols'
      return 'weak';
    }

    if (hasLetters && hasDigits && hasCharacters) {
      this.message = `Your password is strong. You needn't be afraid of`
      return 'strong';
    }

    if ((hasLetters && hasDigits) ||
      (hasLetters && hasCharacters) ||
      (hasDigits && hasCharacters)
    ) {
      this.message = "Your password is medium. You should add letters, digits and special characters to make your password strong"
      return 'medium';
    }

    if (hasLetters || hasDigits || hasCharacters) {
      this.message = "Your password is too easy. You should add letters, digits and special characters to make your password strong"
      return 'easy';
    }

    return "invalid";
  }
}
