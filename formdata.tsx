      <form onSubmit={handleSubmitReset(handlePasswordRecoverySubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="otp"
                  control={control}
                  rules={{ required: "OTP is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="number"
                      label="Enter OTP"
                      value={receivedOtp || ""}
                      onChange={(e) => setReceivedOtp(Number(e.target.value))}
                    />
                  )}
                />
                {resetErrors.otp && (
                  <span style={{ color: "red" }}>
                    {resetErrors.otp.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      value={recoveryEmail}
                      onChange={handleRecoveryEmailChange}
                    />
                  )}
                />
                {resetErrors.email && (
                  <span style={{ color: "red" }}>
                    {resetErrors.email.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  )}
                />
                {resetErrors.password && (
                  <span style={{ color: "red" }}>
                    {resetErrors.password.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledButtonReset
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmitReset(handlePasswordRecoverySubmit)}
                >
                  Reset Password
                </StyledButtonReset>
              </Grid>
            </Grid>
          </form>
